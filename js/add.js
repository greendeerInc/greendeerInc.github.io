import { protectPage } from "./auth.js";
import { db, auth } from "./firebase-config.js";
import {
    collection,
    doc,
    getDoc,
    getDocs,
    addDoc,
    setDoc,
    serverTimestamp,
    updateDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import { onAuthStateChanged }
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// Import ICAL library
// (removed incorrect ES module import — ical.js will be loaded as a global via profile.html)

protectPage();

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

window.addEventListener("DOMContentLoaded", async () => {

    await auth.authStateReady();

    if (!auth.currentUser) return;

    await loadCurrentUser(auth.currentUser);

});

const form =
    document.getElementById(
        "eventForm"
    );

const message =
    document.getElementById(
        "eventMessage"
    );

form.addEventListener(
    "submit",
    async (e) => {

        e.preventDefault();

        try {

            const user =
                auth.currentUser;

            if (!user) {
                throw new Error(
                    "User not logged in."
                );
            }

            const repeatDays =
                Array.from(
                    document.querySelectorAll(
                        ".days-grid input:checked"
                    )
                ).map(
                    checkbox => checkbox.value
                );

            await addDoc(

                collection(
                    db,
                    "users",
                    user.uid,
                    "events"
                ),

                {
                    title:
                        document.getElementById(
                            "eventTitle"
                        ).value,

                    date:
                        document.getElementById(
                            "eventDate"
                        ).value,

                    startTime:
                        document.getElementById(
                            "startTime"
                        ).value,

                    endTime:
                        document.getElementById(
                            "endTime"
                        ).value,

                    location:
                        document.getElementById(
                            "eventLocation"
                        ).value,

                    type:
                        document.getElementById(
                            "eventType"
                        ).value,

                    repeatDays,

                    createdAt:
                        serverTimestamp()
                }
            );

            form.reset();

            message.textContent =
                "Event saved successfully.";

        } catch (error) {

            console.error(error);

            message.textContent =
                "Failed to save event.";
        }
    }
);
