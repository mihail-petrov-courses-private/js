export class ActiveRouter {
    static set(router) {
        ActiveRouter.activeRouterReference = router;
    }
    static get() {
        return ActiveRouter.activeRouterReference;
    }
}
