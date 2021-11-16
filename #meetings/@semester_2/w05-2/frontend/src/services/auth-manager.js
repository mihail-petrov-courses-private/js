const AUTH_TOKEN         = "AUTH_TOKEN";
export const authManager = {};

authManager.saveToken = (token) => {
    localStorage.setItem(AUTH_TOKEN, token);
};

authManager.getToken = () => {
    return localStorage.getItem(AUTH_TOKEN);
};

authManager.removeToken = () => {
    localStorage.removeItem(AUTH_TOKEN);
}

authManager.isAuthenticated = () => {
    return authManager.getToken() != null;
};