import {
    collection,
    getDocs
}
from
"https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

async function loadUsers(){

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

    snapshot.forEach((doc)=>{

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

import {
    onSnapshot,
    collection
}
from
"https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

onSnapshot(
    collection(db,"users"),
    ()=>{
        loadUsers();
    }
);

container.innerHTML += `
<div class="user-card">

    <img
        src="avatars/${user.avatar || '1.png'}"
        alt="Avatar">

    <div class="user-info">

        <div class="user-name">
            ${user.profileName}
        </div>

        <div class="user-status">
            ${user.status || "No status set"}
        </div>

    </div>

</div>
`;
