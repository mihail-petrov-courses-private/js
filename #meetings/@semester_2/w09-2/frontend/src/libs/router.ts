export class Router {
    
    private _currentRouteParameters = {}
    
    constructor(
        private routerDefinitionObject, 
        private defaultDefinition
    ) {
        this.routerDefinitionObject = routerDefinitionObject;
        this.defaultDefinition      = defaultDefinition;
    }

    public parse(path: string) {

        const parsedRoute = this._parseRoute(path);

        // check for guard
        if(parsedRoute.guard && parsedRoute.guard(path)) {
            return parsedRoute.page;
        }

        if(parsedRoute.guard && !parsedRoute.guard()) {
            return this.getDefaultPage();
        }
        
        return parsedRoute.page;
    }

    public getDefault() {
        return this.defaultDefinition;
    }

    public getDefaultPage() {
        return this.defaultDefinition.page;
    }

    public getParams() {
        return this._currentRouteParameters;
    }

    public getParam(key) {
        return this._currentRouteParameters[key];
    }

    public redirect(routeId) {
        window.location.hash = `#${routeId}`;
    }

    private _parseRoute(routePath) {

        const path                = routePath ? routePath : "_";
        const inputPathCollection = path.split('/');

        for(const routerKeyPath in this.routerDefinitionObject) {

            const routerKeyPathCollection = routerKeyPath.split('/');
            if(this._isProcessable(inputPathCollection, routerKeyPathCollection)) {
                return this.routerDefinitionObject[routerKeyPath];
            }
        }

        return this.getDefault();
    }

    private _isProcessable(inputPathCollection, routerKeyPathCollection): boolean {

        this._currentRouteParameters = {};

        if(inputPathCollection.length != routerKeyPathCollection.length) {
            return false;
        }

        for(let i = 0; i < inputPathCollection.length; i++) {

            const pathElement   = inputPathCollection[i];
            const routeElement  = routerKeyPathCollection[i];

            if(this._isVariable(routeElement)) {

                const variableId = this._stripVariable(routeElement);
                this._currentRouteParameters[variableId] = pathElement;
            }

            const isNotVariable    = !this._isVariable(routeElement);
            const doesNotMatch     = pathElement != routeElement;
            const isNotProcessable = isNotVariable && doesNotMatch;

            if(isNotProcessable) {
                return false;
            }
        }

        return true;
    }

    private _isVariable(path): boolean {
        return path.indexOf("{") == 0 &&
               path.indexOf("}") == (path.length - 1);
    }

    private _stripVariable(path): string {
        return path.replace('{', '').replace('}', '');
    }
}