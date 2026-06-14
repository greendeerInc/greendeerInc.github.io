import { protectPage } from "./auth.js";
import { db, auth } from "./firebase-config.js";
import {
    collection,
    doc,
    getDocs
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import { onAuthStateChanged }
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

protectPage();

const usersGrid = document.getElementById("usersGrid");
const currentUserName = document.getElementById("currentUserName");

async function loadCurrentUser() {

    if (!auth.currentUser) return;

    try {

        const userDoc = await getDoc(
            doc(db, "users", auth.currentUser.uid)
        );

        if (!userDoc.exists()) {
            currentUserName.textContent = "Unknown User";
            return;
        }

        const userData = userDoc.data();

        currentUserName.textContent =
            userData.profileName || "User";

    } catch (error) {

        console.error(
            "Error loading current user:",
            error
        );

        currentUserName.textContent = "User";
    }
}

function timeAgo(timestamp) {

    if (!timestamp) return "Unknown";

    const now = Date.now();
    const then = timestamp.toDate().getTime();

    const diff = Math.floor((now - then) / 1000);

    if (diff < 60) return "Just now";
    if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} hr ago`;

    return `${Math.floor(diff / 86400)} day ago`;
}

function createUserCard(user) {

    return `
        <div class="user-card">

            <div class="user-header">

                <img
                    class="avatar"
                    src="avatars/${user.avatar}"
                    alt="${user.profileName}"
                >

                <div>
                    <div class="user-name">
                        ${user.profileName}
                    </div>
                </div>

            </div>

            <div class="status">
                ${user.status || "No status"}
            </div>

            <div class="last-updated">
                Updated ${timeAgo(user.lastUpdated)}
            </div>

        </div>
    `;
}

async function loadUsers() {

    try {

        const usersSnapshot = await getDocs(
            collection(db, "users")
        );

        usersGrid.innerHTML = "";

        usersSnapshot.forEach((docSnap) => {

            // Skip current user
            if (
                auth.currentUser &&
                docSnap.id === auth.currentUser.uid
            ) {
                return;
            }

            const user = {
                uid: docSnap.id,
                ...docSnap.data()
            };

            usersGrid.innerHTML +=
                createUserCard(user);
        });

    } catch (error) {

        console.error(
            "Error loading users:",
            error
        );

        usersGrid.innerHTML = `
            <div class="loading-card">
                Failed to load users.
            </div>
        `;
    }
}

console.log("Current User:", auth.currentUser);
console.log("Current User:", auth.currentUser);

window.addEventListener("DOMContentLoaded", async () => {

    await auth.authStateReady();

    if (!auth.currentUser) return;

    await loadCurrentUser(auth.currentUser);
    await loadUsers(auth.currentUser);

});
