export class Router {
    
    // {
    //     "/signin" : {
    //         page : signin,
    //         isRestricted : true
    //     },

    //     "/workspace/{id}"
    // }
    constructor(routerDefinitionObject, defaultDefinition) {

        this.routerDefinitionObject = routerDefinitionObject;
        this.defaultDefinition      = defaultDefinition;
    }

    // sigin
    // workspace/test
    // workspace/11

    // workspace/:id
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

    _parseRoute(path) {

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

    _isProcessable(inputPathCollection, routerKeyPathCollection) {

        if(inputPathCollection.length != routerKeyPathCollection.length) {
            return false;
        }

        for(let i = 0; i < inputPathCollection.length; i++) {

            const pathElement   = inputPathCollection[i];
            const routeElement  = routerKeyPathCollection[i];

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
}