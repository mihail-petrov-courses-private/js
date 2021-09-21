const http          = require('http');
const productModel  = require('./products.js');

const requestUrlExtractor = (request) => {

    // 1. Разбиване на URL адреса по символа /
    const requestUrlCollection      = request.url.split('/');

    // /products -> 2
    const requestUrlSegmentCount    = requestUrlCollection.length; // 2 // 3
    const lastSegmentIndex          = requestUrlSegmentCount - 1;

    // Разбиване на заявка по символа ?
    // /products?limit=10
    const requestUrlCollectionQuery = requestUrlCollection[lastSegmentIndex].split('?');
    const queryParameterSegment     = requestUrlCollectionQuery[1];


    // Кога може да имам requestAction
    // /products?limit=10
    // /products/10?limit=10

    // const requestAction         = requestUrlCollection[1];
    const requestAction = (requestUrlSegmentCount == 2) 
                            ? requestUrlCollectionQuery[0] 
                            : requestUrlCollection[1];

    // const requestFilter         = requestUrlCollection[2];
    const requestFilter = (requestUrlSegmentCount == 3) 
                            ? requestUrlCollectionQuery[0] 
                            : undefined;    

    return {
        action  : requestAction,
        filter  : requestFilter,
        query   : queryParameterSegment,
        method  : request.method
    };
}

const endpointProducts = (response, requestExtractInstance) => {

    response.setHeader('Content-Type', 'application/json');

    if(requestExtractInstance.filter) {
        return response.end(JSON.stringify(productModel.findById(requestExtractInstance.filter)));
    }

    return response.end(JSON.stringify(productModel.get()));
};

const endpointNotFound = (response, requestExtractInstance) => {

    response.setHeader('Content-Type', 'application/json');
    response.statusCode = 404;
    response.end(JSON.stringify({
        messagage: 'No sutable end point found'
    }));
}


const server    = http.createServer((request, response) => {
    console.log('Request is made');
    console.log(request);
    console.log('***');
    // const requestUrlCollection  = request.url.split('/');
    // const requestAction         = requestUrlCollection[1];
    // const requestFilter         = requestUrlCollection[2];
    const requestBuildInstance     = requestUrlExtractor(request); 

    // /product     -> 0 => [] 1 => products
    // /product/10  -> 0 => [] 1 => products 2 => 10

    // if(request.url == '/products') {
    if(requestBuildInstance.action == 'products') {
        return endpointProducts(response, requestBuildInstance);

        // response.setHeader('Content-Type', 'application/json');
        // response.end(JSON.stringify(productModel.get()));
    }

    return endpointNotFound(response, requestBuildInstance);

    // else {
    //     response.statusCode = 404;
    //     response.end('Endpoint not found');
    // }
});

server.listen(1234, () => {
    console.log('Server started');
});