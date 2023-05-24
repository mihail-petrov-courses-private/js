// Ще съдържа всички стоки които съм завел в системата, 
var productBuyCollection = [];

const operationBuy = function() {
    
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
    
    productBuyCollection.push(productObject);
    console.log(`Резултат : ${productObject.render()}`);
}