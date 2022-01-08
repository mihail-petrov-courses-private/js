export class AuthManager {
    static saveToken(token) {
        localStorage.setItem(AuthManager.AUTH_TOKEN, token);
    }
    static getToken() {
        return localStorage.getItem(AuthManager.AUTH_TOKEN);
    }
    static removeToken() {
        localStorage.removeItem(AuthManager.AUTH_TOKEN);
    }
    static isAuthenticated() {
        return AuthManager.getToken() != null;
    }
}
AuthManager.AUTH_TOKEN = "AUTH_TOKEN";
