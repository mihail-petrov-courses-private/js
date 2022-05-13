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

console.log(requestUrlExtractor({
    url: '/products'
}));
console.log('***')
console.log(requestUrlExtractor({
    url: '/products/10'
}));
console.log('***')
console.log(requestUrlExtractor({
    url: '/products?limit=10&size=10'
}));
console.log('***')
console.log(requestUrlExtractor({
    url: '/products/10?limit=10'
}));