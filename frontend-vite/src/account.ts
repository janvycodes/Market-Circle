import {
    validateEmail,
    validatePassword,
    saveToLocalStorage,
    getFromLocalStorage,
    removeFromLocalStorage
} from "./utils";

export function setupFroms() {
    const loginForm = document.querySelector<HTMLFormElement>("#loginTab form");
    const signupForm = document.querySelector<HTMLFormElement>("#signupTab form");
    const rememberMe = document.querySelector<HTMLInputElement>("#rememberMe");

    const remeberedEmail = getFromLocalStorage("email");
    if (remeberedEmail && loginForm) {
        const emailInput = loginForm.querySelector<HTMLInputElement>('input[type="email"]');
        if (emailInput) {
            emailInput.value = remeberedEmail;
            if (rememberMe) rememberMe.checked = true;
        }
    }

    loginForm?.addEventListener("submit", (e) => {
        e.preventDefault();

        const email = loginForm.querySelector<HTMLInputElement>('input[type="email"]')!.value.trim();
        const password = loginForm.querySelector<HTMLInputElement>('input[type="password"]')!.value;

        if (!validateEmail(email) || !validatePassword(password)) {
            showToast("Invalide login details", "danger");
            return;
        }

        const accounts = JSON.parse(localStorage.getItem("accounts") || "[]");
        const user = accounts.find((acc: any) => acc.email === email && acc.password === password);

        if(!user) {
            showToast("Invalid email or password.", "danger");
            return;
        }

        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userFirstName", user.firstName);
        localStorage.setItem("userEmail", user.email);

        disableButton(loginForm, true);
        showToast(`Welcome back, ${user.firstName}! Login successful.`, "success");
        
        setTimeout(() => {
            window.location.assign("/index.html");
            disableButton(loginForm, false);
            loginForm.reset();
        }, 1200);

        if (rememberMe?.checked) saveToLocalStorage("email", email);
        else removeFromLocalStorage("email");

    });

    signupForm?.addEventListener("submit", (e) => {
        e.preventDefault();

        const inputs = signupForm.querySelectorAll<HTMLInputElement>("input");
        const fullName = inputs[0]?.value.trim() || "";
        const email = inputs[1]?.value.trim() || "";
        const password = inputs[2]?.value || "";
        const confirmPassword = inputs[3]?.value || "";

        if (!fullName || !validateEmail(email) || !validatePassword(password) || password !== confirmPassword) {
            showToast("Invalid signup details", "danger");
            return;
        }

        const firstName = fullName.split(" ")[0] || "";
        const accounts = JSON.parse(localStorage.getItem("accounts") || "[]");

        if (accounts.some((acc: any) => acc.email === email)) {
            showToast("Email already registered.", "danger");
            return;
        }

        disableButton(signupForm, true);
        accounts.push({ email, firstName, password });
        localStorage.setItem("accounts", JSON.stringify(accounts));
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userFirstName", firstName);
        localStorage.setItem("userEmail", email)
        
        showToast("Account created successful.", "success");

        setTimeout(() => {
            disableButton(signupForm, false);
            signupForm.reset();
        }, 1200);
    });

    const tabButtons = document.querySelectorAll<HTMLButtonElement>("#authTabs button");
    tabButtons.forEach((btn) =>
        btn.addEventListener("click", () => {
            loginForm?.reset();
            signupForm?.reset();
        })
    );

    const passwordInputs = document.querySelectorAll<HTMLInputElement>('input[type="password"]');
    passwordInputs.forEach((input) => {
        const toggle = document.createElement("span");
        toggle.className = "bi bi-eye-slash position-absolute end-0 me-3 text-muted";
        toggle.style.cursor = "pointer";
        input.parentElement?.classList.add("position-relative");
        input.parentElement?.appendChild(toggle);

        toggle.addEventListener("click", () => {
            if (input.type === "password") {
                input.type = "text";
                toggle.className = "bi bi-eye position-absolute end-0 me-3 text-muted";
            } else {
                input.type = "password";
                toggle.className = "bi bi-eye-slash position-absolute end-0 me-3 text-muted";
            }
        });
    });
}

function disableButton(form: HTMLFormElement, disabled: boolean) {
    const btn = form.querySelector<HTMLButtonElement>('button[type="submit"]');
    if (btn) {
        btn.disabled = disabled;
        btn.innerText = disabled ? "Processing..." : btn.getAttribute("data-label") || "Submit";
    }
}


function showToast(message: string, type: "success" | "danger" | "info") {
    const containerId = "toast-container";
    let container = document.getElementById(containerId)
    if (!container) {
        container = document.createElement("div");
        container.id = containerId;
        container.className = "toast-container position-fixed bottom-0 end-0 p-3";
        document.body.appendChild(container);
    }

    const toast = document.createElement("div");
    toast.className = `toast align-items-center text-bg-${type} border-0 show mb-2`;
    toast.role = "alert";
    toast.innerHTML = `
        <div class="d-flex">
            <div class="toast-body">${message}</div>
            <button type="button" class="btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
        </div>
    `;
    container.appendChild(toast);
    setTimeout(() => toast.remove(), 3000)
}