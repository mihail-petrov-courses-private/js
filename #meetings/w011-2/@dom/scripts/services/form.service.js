const FormService = (() => {

    let formInputReference;

    const ERROR_MESSAGE = {};

    const validationRule = {};

    // Мисля си че така би работило - правилно
    const setRule = (ruleId, ruleDescriptorObject) => {

        if(ruleId && ruleDescriptorObject.callback) {
            validationRule[ruleId] = ruleDescriptorObject.callback;
        }

        if(ruleId && ruleDescriptorObject.message) {
            ERROR_MESSAGE[ruleId] = ruleDescriptorObject.message;
        }
    };

    /**
     * @author Mihail Petrov 
     * @param {*} inputCollection 
     */
    const register = (inputCollection) => {
        formInputReference = inputCollection;
    };

    const insertBefore = (existingDomElement, newDomElement) => {

        // 1. Взимаме родителя на съществуващия елемент
        // * той показва на програмата къде ще се извърши операцията по вмъкване на новия елемент
        let existingDomElementParent = existingDomElement.parentNode;

        // 2. Пъхаме новия елемент преди съществуващия
        existingDomElementParent.insertBefore(newDomElement, existingDomElement);
    };


    const insertAfter = (existingDomElement, newDomElement) => {
        
        // 1. Взимаме родителя на съществуващия елемент
        // * той показва на програмата къде ще се извърши операцията по вмъкване на новия елемент
        const existingDomElementParent = existingDomElement.parentNode;

        // 2. Взимаме елемента който се намира след existingDomElement
        const existingDomElementSibling = existingDomElement.nextSibling;

        // 3. Пъхаме новия елемент преди елемента намиращ се след existingDomElement
        existingDomElementParent.insertBefore(newDomElement, existingDomElementSibling);
    };

    /**
     * @author Mihail Petrov
     */
     const isFormValid = () => {

        for(let inputReference of formInputReference) {
            
            let domElement  = inputReference.input;
            let ruleObject  = inputReference.rules;

            let isInvalid = isInputFieldInvalid(domElement, ruleObject, 
                
                (ruleId) => {

                    const errorMessage = ruleObject[ruleId].message || ERROR_MESSAGE[ruleId];
                    
                    domElement.classList.add('input--error');

                    const nextElement = domElement.nextElementSibling;
                    if(nextElement.getAttribute('data-is-error-placeholder') == "true") {
                        nextElement.remove();
                    }

                    const newHtmlElement = document.createElement("div"); // DIV
                    newHtmlElement.setAttribute('data-is-error-placeholder', "true");
                    newHtmlElement.setAttribute('class', 'error-message');
                    newHtmlElement.innerHTML = errorMessage;
                    insertAfter(domElement, newHtmlElement);

                    return true;
                }, 
                
                () => {

                    domElement.classList.remove('input--error');
                    const nextElement = domElement.nextElementSibling;
                    if(nextElement.getAttribute('data-is-error-placeholder') == "true") {
                        nextElement.remove();
                    }

                    return false;
                }
            );

            if(isInvalid) {
                return false;
            }
        }

        return true;
    };


    const isInputFieldInvalid = (domElement, ruleObject, invalidCallback, validCallback) => {

        const domElementValue = domElement.value;

        for(let ruleFunction in ruleObject) {

            const ruleArgument = ruleObject[ruleFunction];
            if(!validationRule[ruleFunction](domElementValue, ruleArgument)) {
                return invalidCallback(ruleFunction);
            }
        }

        return validCallback();
    };

    return {
        register, isFormValid, setRule
    }

})();