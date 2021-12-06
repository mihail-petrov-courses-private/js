import { domat } from "./domat.js";

export const FormGroup = (formId) => {

    const formParent = domat(formId);
    
    // да намеря всички input елементи
    const formInputCollection = formParent.dom().elements;
    const formGroupCollection = {};
    for(const formInput of formInputCollection) {
        const element = domat(formInput);
        formGroupCollection[element.attr('data-name')] = element;
    }

    return new FormGroupReference(formGroupCollection);
};

const findSubmitAction = (formGroupCollection) => {

    for(const index in formGroupCollection ) {
        if(formGroupCollection[index].hasAttr('data-submit')) {
            return formGroupCollection[index];
        }
    }
}

export class FormGroupReference {

    private errorMessage;
    private submitElement;

    constructor(private formGroupCollection) {

        this.errorMessage           = {};
        this.formGroupCollection    = formGroupCollection;
        this.submitElement          = findSubmitAction(formGroupCollection);
    }

    public get(formElementId) {
        return this.formGroupCollection[formElementId];
    }

    public getValue(formElementId) {
        return this.formGroupCollection[formElementId].value();
    }

    public setValue(formElementId, value) {
        this.formGroupCollection[formElementId].value(value);
    }

    public getFormValue() {

        const formGroupValueObject = {};
        for(const index in this.formGroupCollection) {

            if(this.__isInputable(index)) {
                formGroupValueObject[index] = this.getValue(index);
            }
        }

        return formGroupValueObject;
    }

    public isValid(formElementId) {

        const element = this.get(formElementId);
        if(element.hasAttr('data-validation-required')) {
            if(element.value().length == 0) {
                this.errorMessage[formElementId] = "Полето е задължително";
                return false;
            }
        }

        if(element.hasAttr('data-validation-minlen')) {

            const validationValue = element.attr('data-validation-minlen');

            if(element.value().length < validationValue) {
                this.errorMessage[formElementId] = `Минимална дължина ${validationValue}`;
                return false;
            }
        }

        if(element.hasAttr('data-validation-email')) {

            const emailValidation = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if(!emailValidation.test(element.value())) {
                this.errorMessage[formElementId] = `Невалиден E-mail адрес`;
                return false;
            }
        }

        return true;
    }

    public validateInput(index) {

        const errorPlaceholder  = domat(`[data-error="${index}"]`);

        if(this.isValid(index)) {

            delete this.errorMessage[index];

            if(errorPlaceholder) {
                errorPlaceholder.html("");
            }

            return;
        }

        const message               = this.errorMessage[index];
        const element               = this.formGroupCollection[index];
        const errorPlaceholderHtml  = `<div data-error="${index}">${message}</div>`;

        if(errorPlaceholder) {
            return errorPlaceholder.html(errorPlaceholderHtml);
        }
        
        element.after(errorPlaceholderHtml);
    }

    public validate() {

        for(const index in this.formGroupCollection) {

            if(this.__isInputable(index)) {
                this.validateInput(index);
            }
        }
    }

    public isFormValid() {

        this.validate();
        return Object.keys(this.errorMessage).length == 0;
    }

    public submit(callback) {

        this.submitElement.on('click', (e) => {

            e.preventDefault();
            callback(this.getFormValue());
        });
    }

    public reset() {

        for(const index in this.formGroupCollection) {
            this.setValue(index, "");
        }
    }

    public submitIfValid(callback) {
        
        this.submitElement.on('click', (e) => {

            if(!this.isFormValid()) {
                return;
            }            

            e.preventDefault();
            callback(this.getFormValue());
        });
    }

    private __isSubmitable(formElementId) {
        return this.formGroupCollection[formElementId].hasAttr('data-submit');
    }

    private __isInputable(formElementId)  {
        return !this.__isSubmitable(formElementId);
    }    
}