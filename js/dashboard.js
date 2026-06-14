import { protectPage } from "./auth.js";
import { db, auth } from "./firebase-config.js";
import {
    collection,
    getDocs
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const usersSnapshot = await getDocs(
    collection(db, "users")
);

protectPage();

const usersGrid = document.getElementById("usersGrid");
const currentUserName = document.getElementById("currentUserName");

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

            const userData = docSnap.data();

            const user = {
                uid: docSnap.id,
                profileName: userData.profileName || "Unknown User",
                status: userData.status || "Available",
                avatar: userData.avatar || "default.png",
                email: userData.email || "",
                createdAt: userData.createdAt,
                lastUpdated: userData.lastUpdated
            };

            usersGrid.innerHTML += createUserCard(user);

            if (
                auth.currentUser &&
                user.uid === auth.currentUser.uid
            ) {
                currentUserName.textContent =
                    user.profileName;
            }

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
loadUsers();