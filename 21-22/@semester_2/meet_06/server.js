const http              = require('http');
const dispatcherManager = require('./util/request.js');
const productApi        = require('./api/product.api.refactor.js');
const utilApi           = require('./api/_util.api.js');
const db                = require('./database/db.js');


db.query("SELECT * FROM products", (error, collection) => {

    if(error) {
        return console.log(error);
    }

    console.log(collection);
});




const server    = http.createServer((request, response) => {

    const dispatcher = dispatcherManager.Dispatch(request, response);

    dispatcher.action('products',   () => productApi.serve(dispatcher));
    dispatcher.serve(               () => utilApi.serve(dispatcher));
});

server.listen(1234, () => {
    console.log('Server started');
});