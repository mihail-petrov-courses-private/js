const operationBuyLogic = (productObject) => {

    if(!BudgetManager.hasAmount()) {
        return console.error("В касата няма средства");
    }

    let product = new Product(productObject);

    if(BudgetManager.canAffourd(product.getBuyExpense())) {

        BudgetManager.decreaseWith(product.getBuyExpense());
        ProductManager.buy(product);

        return console.log(`Резултат : ${product.render()}`);
    }

    console.error(`Текущ баланс ${currentBalance}`);
    console.error("Няма достатъчно средства в касата, моля опитайте отново");
};

const operationBuy = function(testObject) {
    
    return operationBuyLogic(testObject);


    if(BudgetManager.hasAmount()) {
        return console.error("В касата няма средства");
    }

    console.log("Моля въведе вашия таен код");
    const inputTradingCode = prompt("Въведете вашия код за търговия");

    if(!OperationManager.isTradingCodeValid(inputTradingCode)) {
        return console.error("Въведохте грешен код! моля опитайте отново по късно");
    }

    var category   = prompt("Моля въведете категория на стоката");
    var title      = prompt("Моля въведете име на стоката");
    var count      = prompt("Моля въведете количество от закупената стока");
    var buyPrice   = prompt("Моля въведете покупна цена");
    var sellPrice  = prompt("Моля въведете покупна продажна цена");    
    operationBuyLogic({
        category, title, count, buyPrice, sellPrice
    });
}