export const ActiveRouter = {};

let activeRouterReference = null;

ActiveRouter.set = (router) => {
    activeRouterReference = router;
}

ActiveRouter.get = () => {
    return activeRouterReference;
}