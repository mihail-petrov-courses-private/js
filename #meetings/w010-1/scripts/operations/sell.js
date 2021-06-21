const operationSell = function() {
    
    let categoryCollection = ProductManager.getAllCategories();

    for(let i = 0; i < categoryCollection.length; i++) {
        console.log(categoryCollection[i]);
    }

    // избирам си оръжия
    let productCollection = ProductManager.getAllProductsByCategory("оръжия");

    for(let i = 0; i < productCollection.length; i++) {

        let product = productCollection[i];
        console.log(`${product.getId()} ${product.getTitle()}`);
    }
};