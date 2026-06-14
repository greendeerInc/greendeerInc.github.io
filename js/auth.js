import { auth } from "./firebase-config.js";

import {
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

export function protectPage() {

    onAuthStateChanged(auth, (user) => {

        if (!user) {

            window.location.replace(
                "login.html"
            );

        }

    });

}

export async function logout() {

    await signOut(auth);

    window.location.replace(
        "login.html"
    );

}

window.logout = logout;