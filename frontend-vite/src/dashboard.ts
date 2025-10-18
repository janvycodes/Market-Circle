 export function accountDashboard() {  
    const sidebar = document.getElementById("sideBar");
    const toggleBtn = document.getElementById("toggleSidebar");

    if(sidebar && toggleBtn) {
        toggleBtn.addEventListener("click", () => {
            sidebar.classList.toggle("collapsed");
        });
    }

    const mediaQuery = window.matchMedia("(max-width: 991px)");
    function handleResize() {
        if(mediaQuery.matches){
            sidebar?.classList.remove("collapse");
        }
    }

    handleResize();
    window.addEventListener("resize", handleResize);

    document.addEventListener("keydown", (e) => {
        if(e.key === "Escape" && sidebar?.classList.contains("show")) {
            sidebar.classList.remove("show");
        }
    });

    interface Order {
        id: string;
        date: string;
        total: number;
        status: string;
    }

    const ordersContainer = document.getElementById("orderContainer");

    if (ordersContainer) {
        const orders: Order[] = [];

        if(orders.length === 0) {
            ordersContainer.innerHTML = `
                <p class="text-muted text-center py-3 mb-0">
                    You have no active order at the moment.
                </p>
            `;
        } else {
            ordersContainer.innerHTML = orders
            .map(
                (orders) => `
                    <div class="order-card">
                        <div class="order-header">
                            <div>
                                <span class="order-id"> #${orders.id}</span><br>
                                <small class="text-muted">Placed on ${orders.date}</small>
                            </div>
                            <span class="badge ${
                                orders.status === "delivered"
                                ? "bg-success"
                                : orders.status === "processing"
                                ? "bg-warning text-dark"
                                : "bg-secondary"
                            } order-status">${orders.status}</span>
                        </div>
                        <div class="d-flex justify-content-between align-items-center mt-3">
                            <strong>Total: ${orders.total.toFixed(2)}</strong>
                            <div class="order-actions">
                                <button class="btn btn-outline-success btn-sm">View</button>
                                <button class="btn btn-outline-warning btn-sm">Track</button>
                                <button class="btn btn-outline-danger btn-sm">Cancel</button>
                            </div>
                        </div>
                    </div>
                `
            )
            .join("");
        }
    }

    interface Address {
        id: number;
        label: string;
        address_line: string;
        city?: string;
        country?: string;
    }
}