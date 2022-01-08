import { domat } from './libs/domat.js';
import { AuthManager } from './services/auth-manager.js';
import { template } from './libs/api.js';
import { ActiveRouter } from './services/active-router.js';
import bootstrapRoute from './bootstrap.router.js';
bootstrapRoute();
const placeholder = domat("#wrapper");
const menuPlaceholder = domat("#menu-top");
const processRouter = () => {
    const hashLocation = window.location.hash;
    const hashCollection = hashLocation.split('#');
    const routePath = hashCollection[1];
    const pageReference = ActiveRouter.get().parse(routePath);
    pageReference(placeholder);
    if (AuthManager.isAuthenticated()) {
        return template(`layouts/authenticated-menu.layout.html`).then(templateHtml => {
            menuPlaceholder.html(templateHtml);
        });
    }
    template(`layouts/regular-menu.layout.html`).then(templateHtml => {
        menuPlaceholder.html(templateHtml);
    });
};
domat(window).on('load', () => processRouter());
domat(window).on('hashchange', () => processRouter());
