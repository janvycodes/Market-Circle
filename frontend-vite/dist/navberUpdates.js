export function setupNavbar() {
    const accountIcon = document.querySelector(".nav-link.account");
    const offcanvasLinks = document.querySelectorAll(".offcanvas a");
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    const firstName = localStorage.getItem("userFirstName");
    if (isLoggedIn && firstName) {
        if (accountIcon) {
            accountIcon.innerHTML = `<i class="bi bi-person"></i> ${firstName}`;
        }
        offcanvasLinks.forEach((link) => {
            var _a;
            if ((_a = link.textContent) === null || _a === void 0 ? void 0 : _a.includes("Login / Signup")) {
                link.innerHTML = `<i class="bi bi-box-arrow-right me-2"></i> Logout`;
                link.href = "#";
                link.addEventListener("click", (e) => {
                    e.preventDefault();
                    localStorage.removeItem("isLoggedIn");
                    localStorage.removeItem("userFirstName");
                    window.location.reload();
                });
            }
        });
    }
}
//# sourceMappingURL=navberUpdates.js.map