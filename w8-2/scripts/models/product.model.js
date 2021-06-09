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

// ++
// Използване на конструктор функция за създаване на нов обект
// ползва се когато искаме да закачим множество външни функции към един обект, без да ги копираме
var Product = function(objectParameter) {

    this.category    = objectParameter.category;
    this.title       = objectParameter.title;
    this.count       = objectParameter.count;
    this.buyPrice    = objectParameter.buyPrice;
    this.sellPrice   = objectParameter.sellPrice;

    this.id          = generateUniqeId();
};

Product.prototype = {
    render() {
        return `Продукт ${this.title} от категория ${this.category}`;    
    },
    getBuyExpense() {
        return this.count * this.buyPrice;
    },

    getSellExpense() {
        return this.count * this.sellPrice;
    }
}

Product.prototype.render = function() {
    return `Продукт ${this.title} от категория ${this.category}`;
};

Product.prototype.getBuyExpense = function() {
    return this.count * this.buyPrice;
};

Product.prototype.getSellExpense = function() {
    return this.count * this.sellPrice;
};


var SpecialProduct = function(objectParameter) {

    this.category       = objectParameter.category;
    this.title          = objectParameter.title;
    this.count          = objectParameter.count;
    this.buyPrice       = objectParameter.buyPrice;
    this.sellPrice      = objectParameter.sellPrice;
    this.promotionPrice = objectParameter.promotionPrice; 
};

SpecialProduct.prototype = Product.prototype;

SpecialProduct.prototype.getPromotionExpense = function() {
    return this.count * this.promotionPrice;
}

// Употреба на класове 
// TypeScript

class ProductClass {

    constructor(category, title, count, buyPrice, sellPrice) {

        this.category       = category;
        this.title          = title;
        this.count          = count;
        this.buyPrice       = buyPrice;
        this.sellPrice      = sellPrice;

        // генериране на уникален идентификатор
        this.id             = generateUniqeId(title);
    }

    render() {
        return `Продукт ${this.title} от категория ${this.category}`;
    };
    
    getBuyExpense() {
        return this.count * this.buyPrice;
    };
    
    getSellExpense() {
        return this.count * this.sellPrice;
    };
}