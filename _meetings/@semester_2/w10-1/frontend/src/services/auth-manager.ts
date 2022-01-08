export class AuthManager {
    
    private static AUTH_TOKEN = "AUTH_TOKEN";

    public static saveToken(token: string): void {
        localStorage.setItem(AuthManager.AUTH_TOKEN, token);
    }

    public static getToken(): string {
        return localStorage.getItem(AuthManager.AUTH_TOKEN);
    }

    public static removeToken() {
        localStorage.removeItem(AuthManager.AUTH_TOKEN);
    }

    public static isAuthenticated() {
        return AuthManager.getToken() != null;
    }
}