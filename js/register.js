import { auth, db }
from "./firebase-config.js";

import {
    createUserWithEmailAndPassword
}
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
    doc,
    setDoc,
    serverTimestamp
}
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const registerBtn =
document.getElementById("registerBtn");

if(registerBtn){

registerBtn.addEventListener(
"click",
async ()=>{

    const profileName =
    document.getElementById(
        "profileName"
    ).value;

    const email =
    document.getElementById(
        "email"
    ).value;

    const password =
    document.getElementById(
        "password"
    ).value;

    const result =
    await createUserWithEmailAndPassword(
        auth,
        email,
        password
    );

    await setDoc(
        doc(
            db,
            "users",
            result.user.uid
        ),
        {
            profileName,
            email,
            createdAt:
            serverTimestamp()
        }
    );

    location.href =
    "dashboard.html";

});

}