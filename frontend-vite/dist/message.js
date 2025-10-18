export function setupUnderConstruction() {
    const toast = document.getElementById("uc-toast");
    const closeBtn = toast.querySelector(".uc-close");
    document.querySelectorAll('a[data-status="pending"]').forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            toast.classList.remove("hidden");
            const timer = setTimeout(() => {
                toast.classList.add("hidden");
            }, 5000);
            closeBtn === null || closeBtn === void 0 ? void 0 : closeBtn.addEventListener("click", () => {
                toast.classList.add("hidden");
                clearTimeout(timer);
            });
        });
    });
}
//# sourceMappingURL=message.js.map