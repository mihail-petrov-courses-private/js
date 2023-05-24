const productModel  = require('../models/product.model');

/**
 * 
 * @param {*} requestExtractInstance 
 * @returns 
 */
const getAllProducts = (query) => {

    return (query) 
    ? productModel.get({ limit: query.limit }) 
    : productModel.get();
};

/**
 * 
 * @param {*} requestExtractInstance 
 * @returns 
 */
const getSingleProduct = (filter) => {
    return productModel.findById(filter);
};

/**
 * 
 * @param {*} response 
 * @param {*} dispatcher 
 * @returns 
 */
const serve = (dispatcher) => {

    if(dispatcher.getMethod() == 'GET') {
        return dispatcher.json(getAllProducts(dispatcher.getQuery()));
    }




    dispatcher.get(() => {

        if(dispatcher.getFilter()) {
            return dispatcher.json(getSingleProduct(dispatcher.getFilter()));
        }
    });

    dispatcher.get(() => {
        return dispatcher.json(getAllProducts(dispatcher.getQuery()));
    });

    dispatcher.post(() => {

        const responseObject = productModel.create(dispatcher.getBody());
        dispatcher.json(responseObject);
    });

    dispatcher.put(() => {

        if(dispatcher.getFilter()) {

            const responseObject = productModel.update(
                dispatcher.getFilter(), 
                dispatcher.getBody()
            );

            dispatcher.json(responseObject);
        }
    });

    dispatcher.delete(() => {

        if(dispatcher.getFilter()) {

            productModel.remove(dispatcher.getFilter());
            dispatcher.json(response, {
                message: 'Removed succefuly'
            });
        }
    });
};


module.exports = {
    serve
}