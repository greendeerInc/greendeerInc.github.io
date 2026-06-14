import { db } from "./firebase-config.js";

import {
    collection,
    addDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// Example Firestore write

window.saveSampleData = async () => {
    try {
        await addDoc(
            collection(db, "sampleCollection"),
            {
                message: "Hello Firestore",
                timestamp: new Date()
            }
        );

        alert("Saved!");
    } catch (error) {
        console.error(error);
    }
};

import { auth, db }
from "./firebase-config.js";

import {
    doc,
    getDoc
}
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import {
    onAuthStateChanged
}
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

onAuthStateChanged(
auth,
async (user)=>{

    if(!user) return;

    const userDoc =
    await getDoc(
        doc(
            db,
            "users",
            user.uid
        )
    );

    if(userDoc.exists()){

        document
        .getElementById(
            "profileDisplay"
        )
        .innerText =
        userDoc.data()
        .profileName;

    }

});
