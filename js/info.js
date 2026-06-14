import { protectPage } from "./auth.js";
import { db, auth } from "./firebase-config.js";
import {
    collection,
    doc,
    getDoc,
    getDocs,
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


let selectedAvatar = "1.png";

const avatarGrid =
    document.getElementById(
        "avatarGrid"
    );

const currentAvatar =
    document.getElementById(
        "currentAvatar"
    );

const profileNameInput =
    document.getElementById(
        "profileName"
    );

const saveButton =
    document.getElementById(
        "saveProfileBtn"
    );

function buildAvatarPicker() {

    avatarGrid.innerHTML = "";

    for (let i = 1; i <= 6; i++) {

        const avatar =
            document.createElement(
                "img"
            );

        avatar.src =
            `avatars/${i}.png`;

        avatar.dataset.avatar =
            `${i}.png`;

        avatar.classList.add(
            "avatar-option"
        );

        avatar.addEventListener(
            "click",
            () => {

                selectedAvatar =
                    `${i}.png`;

                document
                    .querySelectorAll(
                        ".avatar-option"
                    )
                    .forEach(img => {

                        img.classList.remove(
                            "selected"
                        );

                    });

                avatar.classList.add(
                    "selected"
                );

                currentAvatar.src =
                    avatar.src;
            }
        );

        avatarGrid.appendChild(
            avatar
        );
    }
}

async function loadProfile(user) {

    try {

        const userRef =
            doc(
                db,
                "users",
                user.uid
            );

        const userSnap =
            await getDoc(
                userRef
            );

        if (!userSnap.exists()) {

            return;
        }

        const data =
            userSnap.data();

        profileNameInput.value =
            data.profileName || "";

        selectedAvatar =
            data.avatar || "1.png";

        currentAvatar.src =
            `avatars/${selectedAvatar}`;

        document
            .querySelectorAll(
                ".avatar-option"
            )
            .forEach(img => {

                if (
                    img.dataset.avatar ===
                    selectedAvatar
                ) {

                    img.classList.add(
                        "selected"
                    );
                }
            });

    } catch (error) {

        console.error(
            "Error loading profile:",
            error
        );
    }
}

async function saveProfile() {

    try {

        const user =
            auth.currentUser;

        if (!user) {

            alert(
                "Not logged in."
            );

            return;
        }

        await setDoc(
            doc(
                db,
                "users",
                user.uid
            ),
            {
                profileName:
                    profileNameInput.value.trim(),

                avatar:
                    selectedAvatar,

                email:
                    user.email,

                lastUpdated:
                    serverTimestamp()
            },
            {
                merge: true
            }
        );

        alert(
            "Profile saved."
        );

    } catch (error) {

        console.error(
            "Save failed:",
            error
        );

        alert(
            "Error saving profile. Check console."
        );
    }
}

saveButton.addEventListener(
    "click",
    saveProfile
);

buildAvatarPicker();

onAuthStateChanged(
    auth,
    (user) => {

        if (!user) {

            window.location.href =
                "login.html";

            return;
        }

        loadProfile(user);
    }
);

import { auth } from "./firebase-config.js";

import {
    db
} from "./firebase-config.js";

import {
    collection,
    addDoc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

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
                    "Not logged in"
                );
            }

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
                            "eventTime"
                        ).value,

                    recurrence:
                        document.getElementById(
                            "eventRecurrence"
                        ).value,

                    location:
                        document.getElementById(
                            "eventLocation"
                        ).value,

                    type:
                        document.getElementById(
                            "eventType"
                        ).value,

                    createdAt:
                        serverTimestamp()
                }
            );

            form.reset();

            message.textContent =
                "Event added successfully.";

        } catch (error) {

            console.error(error);

            message.textContent =
                "Failed to save event.";
        }
    }
);
