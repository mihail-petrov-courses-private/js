const BuyController = (() => {

    const controller = () => {

        const formCategoryInput     = document.getElementById("form--category");
        const formTitleInput        = document.querySelector("#form--title");
        const formCountInput        = document.querySelector("#form--count");
        const formBuyPriceInput     = document.querySelector("#form--buy-price");
        const formSellPriceInput    = document.querySelector("#form--sell-price");
        const formActionSubmit      = document.querySelector("#form-action--submit");

        const messageComponent      = document.querySelector("#message");


        FormService.register([
            {
                input: formCategoryInput,
                rules: { 
                    required    : { message: "Полето за категория е задължително"}, 
                    maxLength   : { length : 5} 
                }
            }, 
            {
                input: formTitleInput,
                rules: { 
                    required: { message: "Полето за заглавие е задължително"} 
                }
            },
            {
                input: formCountInput,
                rules: { 
                    required    : { message: "Полето за количество е задължително"},
                    max         : { 
                        message : "Надвишихте стойността", 
                        value   : 10
                    }
                }
            },
            {
                input: formBuyPriceInput,
                rules: { required: true }
            },                          
            {
                input: formSellPriceInput,
                rules: { required: true }
            }                     
        ]);


        formActionSubmit.addEventListener('click', (event) => {

            event.preventDefault();

            if(!FormService.isFormValid()) {
                return;
            }

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
                        <input 
                            data-validation-required
                            data-validation-min-length="{length: 10}"
                        
                        id="form--category" type="text">
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