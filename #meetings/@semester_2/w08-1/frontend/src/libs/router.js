export class Router {
    
    _currentRouteParameters = {}
    
    constructor(routerDefinitionObject, defaultDefinition) {

        this.routerDefinitionObject = routerDefinitionObject;
        this.defaultDefinition      = defaultDefinition;
    }

    parse(path) {
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

    getDefault() {
        return this.defaultDefinition;
    }

    getDefaultPage() {
        return this.defaultDefinition.page;
    }

    getParams() {
        return this._currentRouteParameters;
    }

    getParam(key) {
        return this._currentRouteParameters[key];
    }

    redirect(routeId) {
        window.location.hash = `#${routeId}`;
    }

    _parseRoute(routePath) {

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


    _getPage(key) {
        return this.routerDefinitionObject[key].page;
    }

    // dashboard/workspace/1
    // dashboard/workspace/{id}
    _isProcessable(inputPathCollection, routerKeyPathCollection) {

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

    _isVariable(path) {
        return path.indexOf("{") == 0 &&
               path.indexOf("}") == (path.length - 1);
    }

    _stripVariable(path) {
        return path.replace('{', '').replace('}', '');
    }
}