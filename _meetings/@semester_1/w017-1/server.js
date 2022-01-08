const http              = require('http');
const dispatcherManager = require('./util/request.js');
const productApi        = require('./api/product.api.refactor.js');
const utilApi           = require('./api/_util.api.js');


const server    = http.createServer((request, response) => {

    const dispatcher = dispatcherManager.Dispatch(request, response);

    if(dispatcher.getAction() == 'products') {
        return productApi.serve(dispatcher);
    }

    // dispatcher.action('products', function() {
    //     return productApi.serve(dispatcher);
    // });

    return utilApi.serve(dispatcher);
});

server.listen(1234, () => {
    console.log('Server started');
});