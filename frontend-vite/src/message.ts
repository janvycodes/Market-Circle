export function setupUnderConstruction() {
    const toast = document.getElementById("uc-toast");
    if(!toast) return;
    const closeBtn = toast.querySelector<HTMLButtonElement>(".uc-close");

    document.querySelectorAll<HTMLAnchorElement>('a[data-status="pending"]').forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            toast.classList.remove("hidden");

            const timer = setTimeout(() => {
                toast.classList.add("hidden");
            }, 5000);

            closeBtn?.addEventListener("click", () => {
                toast.classList.add("hidden");
                clearTimeout(timer);
            });
        });
    });
}