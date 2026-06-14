import { auth, db }
from "./firebase-config.js";

import {
    doc,
    getDoc,
    setDoc,
    serverTimestamp
}
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import {
    onAuthStateChanged
}
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

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

const statusInput =
    document.getElementById(
        "status"
    );

const saveButton =
    document.getElementById(
        "saveProfileBtn"
    );

function buildAvatarPicker() {

    avatarGrid.innerHTML = "";

    for (let i = 1; i <= 10; i++) {

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

        statusInput.value =
            data.status || "";

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

                status:
                    statusInput.value.trim(),

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