const AUTH_TOKEN         = "AUTH_TOKEN";
export const AuthManager = {};

AuthManager.saveToken = (token) => {
    localStorage.setItem(AUTH_TOKEN, token);
};

AuthManager.getToken = () => {
    return localStorage.getItem(AUTH_TOKEN);
};

AuthManager.removeToken = () => {
    localStorage.removeItem(AUTH_TOKEN);
}

AuthManager.isAuthenticated = () => {
    return AuthManager.getToken() != null;
};