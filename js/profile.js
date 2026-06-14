import { auth, db }
from "./firebase-config.js";

import {
    doc,
    getDoc,
    updateDoc
}
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

let selectedAvatar = "1.png";

const avatarGrid =
document.getElementById("avatarGrid");

for(let i = 1; i <= 10; i++){

    const img =
    document.createElement("img");

    img.src =
    `avatars/${i}.png`;

    img.classList.add(
        "avatar-option"
    );

    img.onclick = () => {

        selectedAvatar =
        `${i}.png`;

        document
        .getElementById(
            "currentAvatar"
        )
        .src =
        img.src;
    };

    avatarGrid.appendChild(img);
}

await updateDoc(
    doc(
        db,
        "users",
        auth.currentUser.uid
    ),
    {
        profileName:
            profileName.value,

        status:
            status.value,

        avatar:
            selectedAvatar,

        lastUpdated:
            serverTimestamp()
    }
);

function buildAvatarPicker(){

    avatarGrid.innerHTML = "";

    for(let i = 1; i <= 10; i++){

        const avatar =
        document.createElement("img");

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
                .forEach(el =>
                    el.classList.remove(
                        "selected"
                    )
                );

                avatar.classList.add(
                    "selected"
                );

                document
                .getElementById(
                    "currentAvatar"
                )
                .src =
                avatar.src;
            }
        );

        avatarGrid.appendChild(
            avatar
        );
    }
}


async function loadProfile(){

    const userRef =
    doc(
        db,
        "users",
        auth.currentUser.uid
    );

    const userSnap =
    await getDoc(userRef);

    if(!userSnap.exists()) return;

    const user =
    userSnap.data();

    document
    .getElementById(
        "profileName"
    )
    .value =
    user.profileName || "";

    document
    .getElementById(
        "status"
    )
    .value =
    user.status || "";

    selectedAvatar =
    user.avatar || "1.png";

    document
    .getElementById(
        "currentAvatar"
    )
    .src =
    `avatars/${selectedAvatar}`;

    document
    .querySelectorAll(
        ".avatar-option"
    )
    .forEach(img => {

        if(
            img.dataset.avatar ===
            selectedAvatar
        ){
            img.classList.add(
                "selected"
            );
        }

    });
}


document
.getElementById(
    "saveProfileBtn"
)
.addEventListener(
    "click",
    async () => {

        await updateDoc(
            doc(
                db,
                "users",
                auth.currentUser.uid
            ),
            {
                profileName:
                    document
                    .getElementById(
                        "profileName"
                    )
                    .value,

                status:
                    document
                    .getElementById(
                        "status"
                    )
                    .value,

                avatar:
                    selectedAvatar
            }
        );

        alert(
            "Profile updated."
        );
    }
);

