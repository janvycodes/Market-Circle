import { validateEmail, validatePassword, saveToLocalStorage, getFromLocalStorage, removeFromLocalStorage } from "./utils";
export function setupFroms() {
    const loginForm = document.querySelector("#loginTab form");
    const signupForm = document.querySelector("#signupTab form");
    const rememberMe = document.querySelector("#rememberMe");
    const remeberedEmail = getFromLocalStorage("email");
    if (remeberedEmail && loginForm) {
        const emailInput = loginForm.querySelector('input[type="email"]');
        if (emailInput) {
            emailInput.value = remeberedEmail;
            if (rememberMe)
                rememberMe.checked = true;
        }
    }
    loginForm === null || loginForm === void 0 ? void 0 : loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const email = loginForm.querySelector('input[type="email"]').value.trim();
        const password = loginForm.querySelector('input[type="password"]').value;
        if (!validateEmail(email) || !validatePassword(password)) {
            showToast("Invalide login details", "danger");
            return;
        }
        const accounts = JSON.parse(localStorage.getItem("accounts") || "[]");
        const user = accounts.find((acc) => acc.email === email && acc.password === password);
        if (!user) {
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
        if (rememberMe === null || rememberMe === void 0 ? void 0 : rememberMe.checked)
            saveToLocalStorage("email", email);
        else
            removeFromLocalStorage("email");
    });
    signupForm === null || signupForm === void 0 ? void 0 : signupForm.addEventListener("submit", (e) => {
        var _a, _b, _c, _d;
        e.preventDefault();
        const inputs = signupForm.querySelectorAll("input");
        const fullName = ((_a = inputs[0]) === null || _a === void 0 ? void 0 : _a.value.trim()) || "";
        const email = ((_b = inputs[1]) === null || _b === void 0 ? void 0 : _b.value.trim()) || "";
        const password = ((_c = inputs[2]) === null || _c === void 0 ? void 0 : _c.value) || "";
        const confirmPassword = ((_d = inputs[3]) === null || _d === void 0 ? void 0 : _d.value) || "";
        if (!fullName || !validateEmail(email) || !validatePassword(password) || password !== confirmPassword) {
            showToast("Invalid signup details", "danger");
            return;
        }
        const firstName = fullName.split(" ")[0] || "";
        const accounts = JSON.parse(localStorage.getItem("accounts") || "[]");
        if (accounts.some((acc) => acc.email === email)) {
            showToast("Email already registered.", "danger");
            return;
        }
        disableButton(signupForm, true);
        accounts.push({ email, firstName, password });
        localStorage.setItem("accounts", JSON.stringify(accounts));
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userFirstName", firstName);
        localStorage.setItem("userEmail", email);
        showToast("Account created successful.", "success");
        setTimeout(() => {
            disableButton(signupForm, false);
            signupForm.reset();
        }, 1200);
    });
    const tabButtons = document.querySelectorAll("#authTabs button");
    tabButtons.forEach((btn) => btn.addEventListener("click", () => {
        loginForm === null || loginForm === void 0 ? void 0 : loginForm.reset();
        signupForm === null || signupForm === void 0 ? void 0 : signupForm.reset();
    }));
    const passwordInputs = document.querySelectorAll('input[type="password"]');
    passwordInputs.forEach((input) => {
        var _a, _b;
        const toggle = document.createElement("span");
        toggle.className = "bi bi-eye-slash position-absolute end-0 me-3 text-muted";
        toggle.style.cursor = "pointer";
        (_a = input.parentElement) === null || _a === void 0 ? void 0 : _a.classList.add("position-relative");
        (_b = input.parentElement) === null || _b === void 0 ? void 0 : _b.appendChild(toggle);
        toggle.addEventListener("click", () => {
            if (input.type === "password") {
                input.type = "text";
                toggle.className = "bi bi-eye position-absolute end-0 me-3 text-muted";
            }
            else {
                input.type = "password";
                toggle.className = "bi bi-eye-slash position-absolute end-0 me-3 text-muted";
            }
        });
    });
}
function disableButton(form, disabled) {
    const btn = form.querySelector('button[type="submit"]');
    if (btn) {
        btn.disabled = disabled;
        btn.innerText = disabled ? "Processing..." : btn.getAttribute("data-label") || "Submit";
    }
}
function showToast(message, type) {
    const containerId = "toast-container";
    let container = document.getElementById(containerId);
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
    setTimeout(() => toast.remove(), 3000);
}
//# sourceMappingURL=account.js.map