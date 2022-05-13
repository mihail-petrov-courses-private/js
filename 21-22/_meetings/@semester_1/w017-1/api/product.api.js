const productModel  = require('../models/product.model');
const requestUtil   = require('../util/request.js');

/**
 * 
 * @param {*} requestExtractInstance 
 * @returns 
 */
const getAllProducts = (requestExtractInstance) => {

    if(requestExtractInstance.query) {

        const limit = requestExtractInstance.query.limit;
        return productModel.get({ limit });
    }

    return productModel.get();
};

/**
 * 
 * @param {*} requestExtractInstance 
 * @returns 
 */
const getSingleProduct = (requestExtractInstance) => {
    return productModel.findById(requestExtractInstance.filter);
};


/**
 * 
 * @param {*} response 
 * @param {*} requestExtractInstance 
 * @returns 
 */
const endpointProducts = (request, response, requestExtractInstance) => {

    // GET
    if(requestExtractInstance.method == "GET") {

        if(requestExtractInstance.filter) {
            return requestUtil.json(response, getSingleProduct(requestExtractInstance));
        }
    
        return requestUtil.json(response, getAllProducts(requestExtractInstance));
    }

    // POST
    if(requestExtractInstance.method == "POST") {

        requestUtil.bodyParser.json(request, (model) => {
            const responseObject = productModel.create(model);
            requestUtil.json(response, responseObject);
        });
    }

    // PUT 
    if(requestExtractInstance.method == "PUT") {

        if(requestExtractInstance.filter) {

            requestUtil.bodyParser.json(request, (model) => {

                const responseObject = productModel.update(requestExtractInstance.filter, model);
                requestUtil.json(response, responseObject);
            });
        }
    }

    if(requestExtractInstance.method == "DELETE") {

        if(requestExtractInstance.filter) {

            productModel.remove(requestExtractInstance.filter);
            requestUtil.json(response, {
                message: 'Removed succefuly'
            });
        }
    }
};


module.exports = {
    endpointProducts
}