import { protectPage } from "./auth.js";

protectPage();

import {
    getFirestore,
    collection,
    getDocs
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";

import {
    getAuth
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";

const db = getFirestore();
const auth = getAuth();

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

        const snapshot = await getDocs(
            collection(db, "users")
        );

        let html = "";

        snapshot.forEach(doc => {

            const user = doc.data();

            html += createUserCard(user);

            if (
                auth.currentUser &&
                doc.id === auth.currentUser.uid
            ) {
                currentUserName.textContent =
                    user.profileName;
            }

        });

        usersGrid.innerHTML = html;

    } catch (error) {

        console.error(error);

        usersGrid.innerHTML = `
            <div class="loading-card">
                Failed to load users.
            </div>
        `;
    }
}

loadUsers();