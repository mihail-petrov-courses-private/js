const BuyController = (() => {

    // TODO: Да изнеса логиката за валидиране на формите в отделен самостоятелен компонент 
    // (сервиз)
    let isFormValidFlag = true;

    const initValidation = () => {
        isFormValidFlag = true;
    };

    const required = (input) => {

        if(!isFormValidFlag) return;

        const rule = input.value && input.value.length > 0;
        if(!rule) {
            input.style.borderColor = "#ff0000";
            isFormValidFlag = false;
        }
        else {
            input.style.borderColor = "#767676";
        }
    };

    const minLength = (input, length) => {

        const rule = input.value && input.value.length >= length;

        if(!rule) {
            input.style.borderColor = "#ff0000";
            isFormValidFlag = false;
        }
        else {
            input.style.borderColor = "#767676";
        }
    }

    const isFormValid = () => {
        return isFormValidFlag;
    };

    const isFormInvalid = () => {
        return !isFormValid();
    }


    const controller = () => {

        const formCategoryInput     = document.getElementById("form--category");
        const formTitleInput        = document.querySelector("#form--title");
        const formCountInput        = document.querySelector("#form--count");
        const formBuyPriceInput     = document.querySelector("#form--buy-price");
        const formSellPriceInput    = document.querySelector("#form--sell-price");
        const formActionSubmit      = document.querySelector("#form-action--submit");

        const messageComponent      = document.querySelector("#message");


        formActionSubmit.addEventListener('click', (event) => {

            // Пояснение : спира последващото презареждане на страницата 
            // презареждането е част от изпращането на формуляр
            event.preventDefault();

            // валидация на формуляр
            initValidation();

            // прототип за имплементация на регистратор за валидационни правила
            // initValidation([{
            //     "input" : formCategoryInput,
            //     "rules" : [{
            //         required    : {},
            //         minLength   : { length : 5},
            //         maxLength   : { length : 15},
            //     }]
            // }]);

            required(formCategoryInput);
            required(formTitleInput);
            required(formCountInput);
            required(formBuyPriceInput);
            required(formSellPriceInput);

            if(isFormInvalid()) return;
            // проверка за валидност

            let product = new Product({
                category    : formCategoryInput.value,
                title       : formTitleInput.value,
                count       : formCountInput.value,
                buyPrice    : formBuyPriceInput.value,
                sellPrice   : formSellPriceInput.value
            });
    
            if(BudgetManager.canAffourd(product.getBuyExpense())) {
    
                BudgetManager.decreaseWith(product.getBuyExpense());
                ProductManager.buy(product);
                messageComponent.innerHTML = "Продукта е успешно закупен";
    
                // рестартиране на формата за покупка
                formCategoryInput.value     = "";
                formTitleInput.value        = "";
                formCountInput.value        = "";
                formBuyPriceInput.value     = "";
                formSellPriceInput.value    = "";
            }
    
        });
    };

    const render = () => {

        return `<div id="buy--panel">
                    <div id="message"></div>
                    <form>
                        <label>Категория</label>
                        <input id="form--category" type="text">
                        <label>Название</label>
                        <input id="form--title" type="text">
                        <label>Количество</label>
                        <input id="form--count" type="number">
                        <label>Покупна цена</label>
                        <input id="form--buy-price" type="text">
                        <label>Продажна цена</label>
                        <input id="form--sell-price" type="text">

                        <button 
                            id="form-action--submit" 
                            class="input--submit">Купи стока
                        </button>
                    </form>
                <div id="buy--panel">`;
    };

    const init = (mainPanelComponent) => {
        // Същинското изпълнение на компонента
        mainPanelComponent.innerHTML = render();
        controller();
    };

    return { init };
})();