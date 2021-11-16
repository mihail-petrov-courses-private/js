import { domat } from './libs/domat.js';
import { authManager } from './services/auth-manager.js';
import signin from './pages/sigin/signin.js';
import signup from './pages/signup/signup.js';
import dashboard from './pages/dashboard/dashboard.js';
import { template } from './libs/api.js';

const placeholder       = domat("#wrapper");
const menuPlaceholder   = domat("#menu-top");

const publicPath = [
    'signin', 'signup'
];

const isPublic = (path) => {
    return publicPath.includes(path);
};

const isAuthenticatable = (path) => {
    return !isPublic(path);
};

const redirect = (routeId) => {
    window.location.hash = `#${routeId}`;
}

const router = (path) => {

    const isRestricted = isAuthenticatable(path) &&
                         !authManager.isAuthenticated();

    if(isRestricted) {
        return redirect("signin");
    }

    if(path == 'signin'     ) return signin(placeholder);
    if(path == 'signup'     ) return signup(placeholder);
    if(path == 'dashboard'  ) return dashboard(placeholder);

    if(path == 'logout'     ) {
        authManager.removeToken();
        return redirect("signin");
    }

    console.log("404 Page Not Found");
};

const processRouter = () => {

    const hashLocation   = window.location.hash;
    const hashCollection = hashLocation.split('#');

    if(hashCollection[1]) {
        router(hashCollection[1]);
    }    

    if(authManager.isAuthenticated()) {
        return template(`layouts/authenticated-menu.layout.html`).then(templateHtml => {
            menuPlaceholder.html(templateHtml);
        });
    }

    template(`layouts/regular-menu.layout.html`).then(templateHtml => {
        console.log(templateHtml);
        menuPlaceholder.html(templateHtml);
    });
}

domat(window).on('load'         , () => processRouter() );
domat(window).on('hashchange'   , () => processRouter() );