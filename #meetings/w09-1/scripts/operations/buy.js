// Ще съдържа всички стоки които съм завел в системата, 
var productBuyCollection = [];

const operationBuy = function() {
    
    if(BudgetManager.hasAmount()) {
        return console.error("В касата няма средства");
    }

    console.log("Моля въведе вашия таен код");
    const inputTradingCode = prompt("Въведете вашия код за търговия");

    if(!isTradingCodeValid(inputTradingCode)) {
        return console.error("Въведохте грешен код! моля опитайте отново по късно");
    }

    var category   = prompt("Моля въведете категория на стоката");
    var title      = prompt("Моля въведете име на стоката");
    var count      = prompt("Моля въведете количество от закупената стока");
    var buyPrice   = prompt("Моля въведете покупна цена");
    var sellPrice  = prompt("Моля въведете покупна продажна цена");    

    var productObject = new Product({
        category, title, count, buyPrice, sellPrice
    });

    if(BudgetManager.canAffourd(productObject.getBuyExpense())) {

        BudgetManager.decreaseWith(productObject.getBuyExpense());
        productBuyCollection.push(productObject);
        return console.log(`Резултат : ${productObject.render()}`);
    }


    // var currentBalance = traderBudget - productObject.getBuyExpense();
    // if(currentBalance > 0) {
    //     traderBudget = currentBalance;
    //     productBuyCollection.push(productObject);
    //     return console.log(`Резултат : ${productObject.render()}`);
    // }

    console.error(`Текущ баланс ${currentBalance}`);
    console.error("Няма достатъчно средства в касата, моля опитайте отново");
}