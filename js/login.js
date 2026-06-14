import { auth }
    from "./firebase-config.js";

import {
    signInWithEmailAndPassword
}
    from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const loginBtn =
    document.getElementById(
        "loginBtn"
    );

const errorDiv =
    document.getElementById(
        "loginError"
    );

loginBtn.addEventListener(
    "click",
    async () => {

        const email =
            document.getElementById(
                "email"
            ).value.trim();

        const password =
            document.getElementById(
                "password"
            ).value;

        errorDiv.textContent = "";

        try {

            await signInWithEmailAndPassword(
                auth,
                email,
                password
            );

            window.location.href =
                "dashboard.html";

        } catch (error) {

            switch (error.code) {

                case "auth/invalid-email":
                    errorDiv.textContent =
                        "Invalid email address.";
                    break;

                case "auth/user-not-found":
                    errorDiv.textContent =
                        "Account not found.";
                    break;

                case "auth/wrong-password":
                    errorDiv.textContent =
                        "Incorrect password.";
                    break;

                case "auth/invalid-credential":
                    errorDiv.textContent =
                        "Incorrect email or password.";
                    break;

                default:
                    errorDiv.textContent =
                        error.message;
            }

            console.error(error);
        }
    }
);

document.addEventListener(
    "keydown",
    (event) => {

        if (event.key === "Enter") {

            loginBtn.click();

        }
    }
);

import {
    onAuthStateChanged
}
    from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

onAuthStateChanged(
    auth,
    (user) => {

        if (user) {

            window.location.href =
                "dashboard.html";

        }

    }
);
