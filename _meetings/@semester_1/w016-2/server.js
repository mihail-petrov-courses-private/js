const http          = require('http');
const requestUtil   = require('./util/request.js');
const productApi    = require('./api/product.api.js');
const utilApi       = require('./api/_util.api.js');


const server    = http.createServer((request, response) => {

    const requestBuildInstance     = requestUtil.requestUrlExtractor(request); 

    if(requestBuildInstance.action == 'products') {
        return productApi.endpointProducts(request, response, requestBuildInstance);
    }

    return utilApi.endpointNotFound(request, response, requestBuildInstance);
});

server.listen(1234, () => {
    console.log('Server started');
});