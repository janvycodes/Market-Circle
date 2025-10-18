import { setupFroms } from "./account";
import { setupNavbar } from "./navberUpdates";
import { setupUnderConstruction } from "./message";
import { accountDashboard } from "./dashboard";



const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("animate-visible");
            observer.unobserve(entry.target)
        }
    });
}, { threshold: 0.5});

document.querySelectorAll(".animate-on-scroll").forEach((el) => {
    observer.observe(el);
});


setupFroms();
setupNavbar();
setupUnderConstruction();
accountDashboard();