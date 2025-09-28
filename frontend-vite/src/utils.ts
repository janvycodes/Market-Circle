export function validateEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function validatePassword(password: string): boolean {
    return password.length >= 8;
}

export function saveToLocalStorage(key: string, value: string): void {
    localStorage.setItem(key, value);
}

export function getFromLocalStorage(key: string): string | null {
    return localStorage.getItem(key);
}

export function removeFromLocalStorage(key: string): void {
    localStorage.removeItem(key);
}