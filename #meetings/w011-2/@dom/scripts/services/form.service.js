const FormService = (() => {

    const formServiceGlobalObject = {};


    let formInputReference;

    const ERROR_MESSAGE = {
        "required" : "Полето е задължително"
    };

    const validationRule = {};

    validationRule.required = (value, ruleArgument) => {
        return value && value.length > 0;
    };

    validationRule.minLength = (value, ruleArgument) => {
        return value && value.length >= ruleArgument.length;
    };

    validationRule.maxLength = (value, ruleArgument) => {
        return value && value.length <= ruleArgument.length;
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

            if(isInputFieldInvalid(domElement, ruleObject)) {

                // TODO: стилизирай като компонент който е не валиден
                domElement.classList.add('input--error');

                // 0. Правя проверка дали error-placehoder div в който пъхам грешките вече съществува
                const nextElement = domElement.nextSibling;
                if(nextElement.getAttribute('data-is-error-placeholder')) {
                    // process existing element
                }
                else {
                    // Как да визуализираме съобщение под дадено input поле ?
                    // 1. Да си създадем нов HTML елемент в който да пъхнем съобщението
                    const newHtmlElement = document.createElement("div"); // DIV
                    newHtmlElement.setAttribute('data-is-error-placeholder', "");
                    newHtmlElement.innerHTML = "Error message";
                    insertAfter(domElement, newHtmlElement);
                }

                return false;
            }
            else {
                // TODO: направи го стандартен input
                // нормално стилизиране
                domElement.classList.remove('input--error');
            }
        }

        return true;
    };


    /**
     * @author Mihail Petrov
     */
     const isFormValidCallback = () => {

        for(let inputReference of formInputReference) {
            
            let domElement  = inputReference.input;
            let ruleObject  = inputReference.rules;

            let isInvalid = isInputFieldInvalidWithCallbackFunctions(domElement, ruleObject, 
                
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
                    console.log(nextElement);
                    console.log(nextElement.getAttribute('data-is-error-placeholder'));
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



    /**
     * @author Mihail Petrov
     * @param {*} domElement 
     * @param {*} ruleObject 
     * @returns 
     */
    const isInputFieldInvalid = (domElement, ruleObject) => {

        const domElementValue = domElement.value;

        for(let ruleFunction in ruleObject) {

            const ruleArgument = ruleObject[ruleFunction]; // object
            if(!validationRule[ruleFunction](domElementValue, ruleArgument)) return true;

            // if(ruleKey == "required"  && !validateIsRequired(domElementValue)                ) return true;
            // if(ruleKey == "minLength" && !validateMinLength(domElementValue, ruleArgument)  ) return true;
            // if(ruleKey == "maxLength" && !validateMaxLength(domElementValue, ruleArgument)  ) return true;
        }

        return false;
    };

    const isInputFieldInvalidWithCallbackFunctions = (domElement, ruleObject, invalidCallback, validCallback) => {

        const domElementValue = domElement.value;

        for(let ruleFunction in ruleObject) {

            const ruleArgument = ruleObject[ruleFunction]; // object
            if(!validationRule[ruleFunction](domElementValue, ruleArgument)) {
                // invalidCallback(ruleFunction);
                // return true;
                formServiceGlobalObject.currentInvalidRuleId = ruleFunction;
                return invalidCallback(ruleFunction);
            }
        }

        // validCallback();
        // return false;
        return validCallback();
    };

    return {
        register, isFormValid, isFormValidCallback
    }

})();