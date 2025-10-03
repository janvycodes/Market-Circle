export function setupUnderConstruction() {
    const toast = document.getElementById("us-toast");
    const closeBtn = toast.querySelector(".uc-close");
    document.querySelectorAll('a[date-status="pending"]').forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            toast.classList.remove("hidden");
            const timer = setTimeout(() => {
                toast.classList.add("hidden");
            }, 3000);
            closeBtn === null || closeBtn === void 0 ? void 0 : closeBtn.addEventListener("click", () => {
                toast.classList.add("hidden");
                clearTimeout(timer);
            });
        });
    });
}
//# sourceMappingURL=message.js.map