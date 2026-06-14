import {
    collection,
    onSnapshot,
    getDocs
}
    from
    "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

async function loadUsers() {

    const container =
        document.getElementById(
            "usersContainer"
        );

    container.innerHTML = "";

    const snapshot =
        await getDocs(
            collection(
                db,
                "users"
            )
        );

    snapshot.forEach((doc) => {

        const user =
            doc.data();

        container.innerHTML += `

        <div class="user-card">

            <img
                src="avatars/${user.avatar || '1.png'}">

            <div>

                <h3>
                    ${user.profileName}
                </h3>

                <p>
                    ${user.status || ''}
                </p>

            </div>

        </div>

        `;
    });

}

const sidebar =
    document.getElementById("sidebar");

const menuBtn =
    document.getElementById("menuBtn");

menuBtn.addEventListener("click", () => {

    if (window.innerWidth <= 768) {

        sidebar.classList.toggle("open");

    } else {

        sidebar.classList.toggle("collapsed");

    }

});

document
    .getElementById(
        "reloadBtn"
    )
    .addEventListener(
        "click",
        loadUsers
    );

loadUsers();

const usersContainer =
    document.getElementById(
        "usersContainer"
    );

onSnapshot(
    collection(
        db,
        "users"
    ),
    (snapshot) => {

        usersContainer.innerHTML = "";

        snapshot.forEach(
            (doc) => {

                const user =
                    doc.data();

                usersContainer.innerHTML += `
                <div class="user-card">

                    <img
                        src="avatars/${user.avatar ||
                    "1.png"
                    }">

                    <div class="user-info">

                        <div class="user-name">
                            ${user.profileName ||
                    "Unknown User"
                    }
                        </div>

                        <div class="user-status">
                            ${user.status ||
                    "No status"
                    }
                        </div>

                    </div>

                </div>
                `;
            }
        );
    }
);

await setDoc(
    doc(
        db,
        "users",
        user.uid
    ),
    {
        profileName,
        avatar: "1.png",
        status: "",
        email,
        createdAt:
            serverTimestamp()
    }
);
