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