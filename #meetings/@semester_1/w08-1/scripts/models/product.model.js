// Създаваме фабрика (обикновенна функция която връща обект)
const createProduct = function(objectParameter) {

    return {
        category    : objectParameter.category, 
        title       : objectParameter.title, 
        count       : objectParameter.count, 
        buyPrice    : objectParameter.buyPrice , 
        sellPrice   : objectParameter.sellPrice, 
        render() {
            console.log("Инфо за стоката"           );
            console.log(`Име            : ${this.title}`       );
            console.log(`Категория      : ${this.category}`    );
            console.log(`Бройка         : ${this.count}`       );
            console.log(`Цена покупка   : ${this.buyPrice}`    );
            console.log(`Цена продажба  : ${this.sellPrice}`   );
        }
    };
};


var Product = function(objectParameter) {

    this.category    = objectParameter.category;
    this.title       = objectParameter.title;
    this.count       = objectParameter.count;
    this.buyPrice    = objectParameter.buyPrice;
    this.sellPrice   = objectParameter.sellPrice;
}