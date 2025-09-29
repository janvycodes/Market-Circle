export function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
export function validatePassword(password) {
    return password.length >= 8;
}
export function saveToLocalStorage(key, value) {
    localStorage.setItem(key, value);
}
export function getFromLocalStorage(key) {
    return localStorage.getItem(key);
}
export function removeFromLocalStorage(key) {
    localStorage.removeItem(key);
}
//# sourceMappingURL=utils.js.map