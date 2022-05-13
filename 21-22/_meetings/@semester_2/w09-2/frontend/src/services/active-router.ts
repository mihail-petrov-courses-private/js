import { Router } from "../libs/router";

export class ActiveRouter {

    private static activeRouterReference;

    public static set(router: Router): void {
        ActiveRouter.activeRouterReference = router;
    }

    public static get(): Router {
        return ActiveRouter.activeRouterReference;    
    }
}