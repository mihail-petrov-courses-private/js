import { Router         } from './libs/router.js';
import { ActiveRouter   } from './services/active-router.js';
import { AuthManager    } from './services/auth-manager.js';

// pages
import signin           from './pages/sigin/signin.js';
import signup           from './pages/signup/signup.js';
import dashboard        from './pages/dashboard/dashboard.js';
import workspace        from './pages/workspace/workspace.js';
import notfound         from './pages/notfound/notfound.js';
import board            from './pages/board/board.js';

const isPublic = (path) => {
    return ['signin', 'signup'].includes(path);
};

const isAuthenticatable = (path) => {
    return !isPublic(path);
};

const guardPrivatePage = (path) => {

    const isRestricted = isAuthenticatable(path) &&
                         !AuthManager.isAuthenticated();

    if(isRestricted) {
        redirect("signin");
        return false;
    }

    return true;
};

const guardAutenticationPage = (path) => {
    
    if(AuthManager.isAuthenticated()) {
        redirect("dashboard");
        return false;
    }

    return true;
};

const redirect = (routeId) => {
    window.location.hash = `#${routeId}`;
};

const routerManager = new Router({
    "signin"                    : { page : signin       , guard: guardAutenticationPage   },
    "signup"                    : { page : signup       , guard: guardAutenticationPage   },
    "dashboard"                 : { page : dashboard    , guard: guardPrivatePage         },
    "dashboard/workspace/{id}"  : { page : dashboard    , guard: guardPrivatePage         },
    "workspace/{id}"            : { page : workspace    , guard: guardPrivatePage         },
    "board/{id}"                : { page : board        , guard: guardPrivatePage         },
    "_"                         : { page : dashboard    , guard: guardPrivatePage         },
}, { page : notfound });

//
export default () => {
    ActiveRouter.set(routerManager);
}