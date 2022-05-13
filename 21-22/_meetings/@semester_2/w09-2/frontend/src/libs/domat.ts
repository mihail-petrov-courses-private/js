export const domat = (selector: any): Domat => {

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

    private domElement;

    constructor(queryElement) {
        this.domElement = queryElement;
    }

    public on(eventString, callback) {
        this.domElement.addEventListener(eventString, callback);
    }

    public css(styleObject) {

        for(let cssProperty in styleObject) {
            this.domElement.style[cssProperty] = styleObject[cssProperty];
        }
    }

    public after(htmlContent) {

        // 1. Създаване на елемент - носител
        const placeholder = document.createElement("div");
        placeholder.innerHTML = htmlContent;

        // 2. Добавяне на елемента
        // 2.1 Взимаме родителския елемент 
        const domElementParent = this.domElement.parentNode;
        // 2.2 Добавяме елеемент пред - някой друг
        domElementParent.insertBefore(placeholder, this.domElement.nextSibling);
    }

    public before(htmlContent) {

    }

    public html(htmlContent: string) {

        if(htmlContent) {
            this.domElement.innerHTML = htmlContent;
        }

        if(htmlContent == '') {
            this.domElement.innerHTML = '';
        }

        return this.domElement.innerHTML;
    }

    public attr(key: string, value?: string) {

        if(value) {
            this.domElement.setAttribute(key, value);
        }

        return this.domElement.getAttribute(key);
    }

    public attrs(objectReference) {

        for(let element in objectReference) {
            this.attr(element, objectReference[element]);
        }
    }

    public removeAttr(key: string) {
        this.domElement.removeAttribute(key);
    }

    public removeAttrs(...attrs) {

        for(let key of attrs ) {
            this.removeAttr(key);
        }       
    }

    public hasAttr(key: string) {
        return this.domElement.attributes.getNamedItem(key) != null;
    }

    public value(value: string | number) {

        if(value) {
            this.domElement.value = value;
        }

        if(value == "") {
            this.domElement.value = "";
        }

        return this.domElement.value;
    }

    public append(value: string | number) {
        this.domElement.innerHTML += value;
    }


    public addClass(classId: string) {
        this.domElement.classList.add(classId);
    }

    public removeClass(classId: string) {
        this.domElement.classList.remove(classId);
    }
    
    public removeFromDom() {
        this.domElement.remove();
    }

    public dom() {
        return this.domElement;
    }

    public offAll() {
        this.domElement.replaceWith(this.domElement.cloneNode(true))
    }
}