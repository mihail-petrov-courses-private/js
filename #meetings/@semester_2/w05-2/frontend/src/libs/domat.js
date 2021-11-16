export const domat = (selector) => {

    const parameterType = typeof selector;
    const isQuery       = parameterType == "string";
    const isDomElement  = !isQuery;

    if(isQuery) {

        const result = document.querySelector(selector);
        return (result) ? new Domat(result) : null;
    }

    if(isDomElement) {
        return new Domat(selector);
    }

    return null;
};

class Domat {

    constructor(queryElement) {
        this.domElement = queryElement;
    }

    on(eventString, callback) {
        this.domElement.addEventListener(eventString, callback);
    }

    css(styleObject) {

        for(let cssProperty in styleObject) {
            this.domElement.style[cssProperty] = styleObject[cssProperty];
        }
    }

    after(htmlContent) {

        // 1. Създаване на елемент - носител
        const placeholder = document.createElement("div");
        placeholder.innerHTML = htmlContent;

        // 2. Добавяне на елемента
        // 2.1 Взимаме родителския елемент 
        const domElementParent = this.domElement.parentNode;
        // 2.2 Добавяме елеемент пред - някой друг
        domElementParent.insertBefore(placeholder, this.domElement.nextSibling);
    }

    before(htmlContent) {

    }

    html(htmlContent) {

        if(htmlContent) {
            this.domElement.innerHTML = htmlContent;
        }

        if(htmlContent == '') {
            this.domElement.innerHTML = '';
        }

        return this.domElement.innerHTML;
    }

    attr(key, value) {

        if(value) {
            this.domElement.setAttribute(key, value);
        }

        return this.domElement.getAttribute(key);
    }

    attrs(objectReference) {

        for(let element in objectReference) {
            this.attr(element, objectReference[element]);
        }
    }

    removeAttr(key) {
        this.domElement.removeAttribute(key);
    }

    removeAttrs() {

        // масивоподобна променлива  arguments съдържа всички 
        // подадени при извикването на функцията аргументи
        console.log(arguments)

        for(let key of arguments ) {
            this.removeAttr(key);
        }       
    }

    hasAttr(key) {
        return this.domElement.attributes.getNamedItem(key) != null;
    }

    value(value) {

        if(value) {
            this.domElement.value = value;
        }

        if(value == "") {
            this.domElement.value = "";
        }

        return this.domElement.value;
    }

    append(value) {
        this.domElement.innerHTML += value;
    }


    addClass(classId) {
        this.domElement.classList.add(classId);
    }

    removeClass(classId) {
        this.domElement.classList.remove(classId);
    }

    dom() {
        return this.domElement;
    }
}