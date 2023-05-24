import { domat          } from './libs/domat.js';
import { authManager    } from './services/auth-manager.js';
import { template       } from './libs/api.js';
import { Router         } from './libs/router.js';
import { ActiveRouter   } from './services/active-router.js';

// pages
import signin           from './pages/sigin/signin.js';
import signup           from './pages/signup/signup.js';
import dashboard        from './pages/dashboard/dashboard.js';
import workspace        from './pages/workspace/workspace.js';
import notfound         from './pages/notfound/notfound.js';

const sampleGuard = (path) => {

    const isRestricted = isAuthenticatable(path) &&
                         !authManager.isAuthenticated();

    if(isRestricted) {
        redirect("signin");
        return false;
    }

    return true;
};

const redirect = (routeId) => {
    window.location.hash = `#${routeId}`;
}

const routerManager = new Router({
    "signin"                    : { page : signin       , guard: sampleGuard },
    "signup"                    : { page : signup       , guard: sampleGuard },
    "dashboard"                 : { page : dashboard    , guard: sampleGuard },
    "dashboard/workspace/{id}"  : { page : dashboard    , guard: sampleGuard },
    "workspace/{id}"            : { page : workspace    , guard: sampleGuard }
}, { page : notfound });

ActiveRouter.set(routerManager);



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

const router = (path) => {

    console.log(path);

    const isRestricted = isAuthenticatable(path) &&
                         !authManager.isAuthenticated();

    if(isRestricted) {
        return redirect("signin");
    }

    if(path == 'signin'     ) return signin(placeholder);
    if(path == 'signup'     ) return signup(placeholder);
    if(path == 'dashboard'  ) return dashboard(placeholder);
    if(path == 'workspace'  ) return workspace(placeholder);

    if(path == 'logout'     ) {
        authManager.removeToken();
        return redirect("signin");
    }

    return notfound(placeholder);
};

const processRouter = () => {

    const hashLocation   = window.location.hash;
    const hashCollection = hashLocation.split('#');
    const routePath      = hashCollection[1];

    if(routePath) {
        const pageReference = routerManager.parse(routePath);
        return pageReference(placeholder);
        // router(routePathCollection);
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