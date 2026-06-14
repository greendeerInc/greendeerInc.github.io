document.addEventListener(
    "DOMContentLoaded",
    () => {

        const sidebar =
            document.getElementById(
                "sidebar"
            );

        const toggle =
            document.getElementById(
                "sidebarToggle"
            );

        toggle.addEventListener(
            "click",
            () => {

                if (
                    window.innerWidth <= 768
                ) {

                    sidebar.classList.toggle(
                        "mobile-open"
                    );

                } else {

                    sidebar.classList.toggle(
                        "collapsed"
                    );

                }

            }
        );

        const currentPage =
            window.location.pathname
            .split("/")
            .pop()
            .replace(
                ".html",
                ""
            );

        document
            .querySelectorAll(
                ".sidebar-link"
            )
            .forEach(link => {

                const page =
                    link.dataset.page;

                if (
                    page === currentPage
                ) {

                    link.classList.add(
                        "active"
                    );
                }

            });

    }
);

import {
    logout
}
from "./auth.js";

document
.getElementById(
    "logoutBtn"
)
?.addEventListener(
    "click",
    logout
);