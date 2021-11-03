const productModel  = require('../models/product.model');
const jwt           = require('jsonwebtoken');

/**
 * 
 * @param {*} requestExtractInstance 
 * @returns 
 */
const getAllProducts = (callback, queryParameterCollection) => {
    productModel.get(callback, queryParameterCollection);
};

/**
 * 
 * @param {*} requestExtractInstance 
 * @returns 
 */
const getSingleProduct = (id, callback) => {
    return productModel.findById(id, callback);
};

/**
 * 
 * @param {*} response 
 * @param {*} dispatcher 
 * @returns 
 */
const serve = (dispatcher) => {

    if(!dispatcher.isAuthorized()) {
        return dispatcher.json({
            'message': 'Operation is not authorized',
            'status' : '401'
        }, 401);
    }

    dispatcher.get(() => {

        if(dispatcher.getFilter()) {

            return getSingleProduct(dispatcher.getFilter(), (error, collection) => {

                if(error) return dispatcher.json({
                    'message': 'Operation failed',
                    'reasone': error,
                    'status' : '404'
                }, 404);

                dispatcher.json(collection);
            });
        }

        getAllProducts((error, collection) => {

            if(error) return dispatcher.json({
                'message': 'Operation failed',
                'reasone': error,
                'status' : '404'
            }, 404);

            dispatcher.json(collection);
        }, dispatcher.getQuery());
    });

    dispatcher.post(() => {

        productModel.create(dispatcher.getBody(), (error, result) => {

            if(error)  return dispatcher.json({
                'message': 'Operation failed',
                'reasone': error,
                'status' : '404'
            }, 404);

            dispatcher.json(result);
        });
    });

    dispatcher.put(() => {

        if(dispatcher.getFilter()) {

            productModel.update(dispatcher.getFilter(), dispatcher.getBody(), (error, collection) => {

                if(error)  return dispatcher.json({
                    'message': 'Operation failed',
                    'reasone': error,
                    'status' : '404'
                }, 404);

                dispatcher.json(collection);
            });
        }
    });

    dispatcher.delete(() => {

        if(dispatcher.getFilter()) {

            productModel.remove(dispatcher.getFilter(), (error, result) => {

                if(error)  return dispatcher.json({
                    'message': 'Operation failed',
                    'status' : '404'
                }, 404);

                if(result && result.affectedRows == 0) return dispatcher.json({
                    'message': 'Now resource founde'
                }, 404);

                if(result && result.affectedRows == 1) return dispatcher.json({
                    'message': 'Row removed succcesfuly'
                })
            });
        }
    });
};


module.exports = {
    serve
}