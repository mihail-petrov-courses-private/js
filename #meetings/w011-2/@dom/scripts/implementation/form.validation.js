(() => {

    FormService.setRule("required", {

        message: "Полето е супер мега задължително",
        callback(value, ruleArgument) {
            return value && value.length > 0;
        }
    });

    FormService.setRule("minLength", { 

        message: "Минималната дължина не е спазена",
        callback(value, ruleArgument) {
            return value && value.length >= ruleArgument.length;
        }
    });

    FormService.setRule("maxLength", {

        message: "Максималната дължина не е спазена",
        callback(value, ruleArgument) {
            return value && value.length <= ruleArgument.length;
        }
    });

    FormService.setRule("max", { 
        
        message: "Надвишили сте стойността",
        callback(value, ruleObject) {
            return value <= ruleObject.value
        }
    });
})();