const ProductManager = (() => {

    // колекция с всички данни
    let productCollection = [];

    // колекция за търсене и справки
    let selectCategoryCollection = {};

    const buy = (product) => {

        // заприходяване в общия склад
        productCollection.push(product);

        // генериране на падходяща структура за търсене
        // 1. Взимаме ключа aka категорията на продукта 
        let key = product.getCategory();
        // 2. Проверяваме дали ключа съществува в selectCategoryCollection
        if(!selectCategoryCollection[key]) {
            selectCategoryCollection[key] = [];
        }
        selectCategoryCollection[key].push(product);

        // if(selectCategoryCollection[key]) {
        //     selectCategoryCollection[key].push(product);
        // }
        // else {
        //     selectCategoryCollection[key] = [];
        //     selectCategoryCollection[key].push(product);
        // }
    };

    const getAllProducts = () => {
        return productCollection;
    };

    const getAllCategories = () => {
        return Object.keys(selectCategoryCollection);

        // let uniqeCategoryCollection = {};
        // for(let i = 0; i < productCollection.length; i++) {
        //     uniqeCategoryCollection[productCollection[i].getCategory()] = null;
        // }
    
        // let resultCollection = [];
        // for(let key in uniqeCategoryCollection) {
        //     resultCollection.push(key);
        // }    

        // return resultCollection;
    };

    const getAllProductsByCategory = (category) => {

        return selectCategoryCollection[category];

        // let resultProductCollection = [];
        // for(let i = 0; i < productCollection.length; i++) {

        //     let product = productCollection[i];

        //     if( product.getCategory() == category) {
        //         resultProductCollection.push(product);
        //     }
        // }

        // return resultProductCollection;
    };

    return {
        buy, getAllProducts, getAllCategories, getAllProductsByCategory
    };

})();