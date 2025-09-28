export function setupNavbar() {
  const accountIcon = document.querySelector<HTMLAnchorElement>(".nav-link.account");
  const offcanvasLinks = document.querySelectorAll<HTMLAnchorElement>(".offcanvas a");

  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const firstName = localStorage.getItem("userFirstName");

  if (isLoggedIn && firstName) {
    if (accountIcon) {
      accountIcon.innerHTML = `<i class="bi bi-person"></i> ${firstName}`;
    }

    offcanvasLinks.forEach((link) => {
      if (link.textContent?.includes("Login / Signup")) {
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