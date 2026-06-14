const currentPage =
    window.location.pathname
        .split("/")
        .pop();

const pageMap = {
    "info.html": 0,
    "study.html": 1,
    "dashboard.html": 2,
    "locations.html": 3,
    "profile.html": 4
};

const footerItems =
    document.querySelectorAll(
        ".footer-item"
    );

const activeIndex =
    pageMap[currentPage];

if (
    activeIndex !== undefined
) {
    footerItems[
        activeIndex
    ].classList.add(
        "active"
    );
}