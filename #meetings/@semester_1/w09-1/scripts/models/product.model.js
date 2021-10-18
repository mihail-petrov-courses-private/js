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

    render() {
        return `Продукт ${this.title} от категория ${this.category}`;
    };
    
    getBuyExpense() {
        return this.count * this.buyPrice; // 100 * 1 
    };
    
    getSellExpense() {
        return this.count * this.sellPrice;
    };
}