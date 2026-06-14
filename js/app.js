import { db } from "./firebase-config.js";

import {
    collection,
    addDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const sidebar = document.getElementById("sidebar");
const menuBtn = document.getElementById("menuBtn");

if (menuBtn) {
    menuBtn.addEventListener("click", () => {
        sidebar.classList.toggle("collapsed");
    });
}

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