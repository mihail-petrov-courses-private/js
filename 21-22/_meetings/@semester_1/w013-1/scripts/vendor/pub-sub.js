const PubSub = (() => {

    const registry = {};

    const register = (name, callback) => {

        if(registry[name]) {
            registry[name].push(callback);
        }
        else {
            registry[name] = []; 
            registry[name].push(callback);
        }
    }

    const process = (name, argumentCollection) => {

        const callbackCollection = registry[name];
        for(const callback of callbackCollection) {
            callback(argumentCollection);
        }
    }

    return {
        register, process
    }

})();