// Ще съдържа всички стоки които съм завел в системата, 
var productBuyCollection = [];


// const createProductObject = function(category, title, count, buyPrice, sellPrice) {
//     return {
//         category, title, count, buyPrice, sellPrice,
//         calculateId() {

//         }
//     };
// }

const operationBuy = function() {
    
    console.log("Моля въведе вашия таен код");
    const inputTradingCode = prompt("Въведете вашия код за търговия");

    if(!isTradingCodeValid(inputTradingCode)) {
        return console.error("Въведохте грешен код! моля опитайте отново по късно");
    }

    // # първи вариант за запис на този обект
    // var productObject = {};
    // productObject['category']   = prompt("Моля въведете категория на стоката");
    // productObject['title']      = prompt("Моля въведете име на стоката");
    // productObject['count']      = prompt("Моля въведете количество от закупената стока");
    // productObject['buyPrice']   = prompt("Моля въведете покупна цена");
    // productObject['sellPrice']  = prompt("Моля въведете покупна продажна цена");

    // # втори вариант за запис
    // var productCategory   = prompt("Моля въведете категория на стоката");
    // var productTitle      = prompt("Моля въведете име на стоката");
    // var productCount      = prompt("Моля въведете количество от закупената стока");
    // var productBuyPrice   = prompt("Моля въведете покупна цена");
    // var productSellPrice  = prompt("Моля въведете покупна продажна цена");    
    // var productObject = {
    //     category: productCategory,
    //     title: productTitle,
    //     count: productCount,
    //     buyPrice: productBuyPrice,
    //     productSellPrice: productSellPrice
    // };

    // # втори вариант и половина за запис
    var category   = prompt("Моля въведете категория на стоката");
    var title      = prompt("Моля въведете име на стоката");
    var count      = prompt("Моля въведете количество от закупената стока");
    var buyPrice   = prompt("Моля въведете покупна цена");
    var sellPrice  = prompt("Моля въведете покупна продажна цена");    

    // вариант за запис 1
    var productObject = createProduct({
        category    : category, 
        title       : title, 
        count       : count, 
        buyPrice    : buyPrice, 
        sellPrice   : sellPrice
    });

    // вариант за запис 2
    var productObject = createProduct({
        category, title, count, buyPrice, sellPrice
    });

    productObject.render();

    productBuyCollection.push(productObject);
}