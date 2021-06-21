class Product {

    constructor(argumentObject) {

        this.category       = argumentObject.category;
        this.title          = argumentObject.title;
        this.count          = +argumentObject.count;
        this.buyPrice       = +argumentObject.buyPrice;
        this.sellPrice      = +argumentObject.sellPrice;

        // генериране на уникален идентификатор
        this.id             = generateUniqeId(this.title);
    }

    getCategory() {
        return this.category;
    }

    getId() {
        return this.id;
    }

    getTitle() {
        return this.title;
    }

    getTaxAmount() {
        return 20;
    }

    render() {
        return `Продукт ${this.title} от категория ${this.category}`;
    };
    
    getBuyExpense() {

        let currentPrice    = this.count * this.buyPrice;
        let taxExpence      = (currentPrice * this.getTaxAmount()) / 100;
        let totalBuyExpense = currentPrice + taxExpence;

        return totalBuyExpense; // 100 * 1 
    };
    
    getSellExpense() {


        return this.count * this.sellPrice;
    };
}