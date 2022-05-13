const parseQueryString = (queryString) => {

    if(!queryString) {
        return {};
    }

    // limit=10&size=2
    const queryObject       = {};
    queryKeyValueCollection = queryString.split('&');
    for(let keyValue of queryKeyValueCollection) {
        const collection    = keyValue.split('=');
        const key           = collection[0];
        const value         = collection[1];
        queryObject[key]    = value;
    }

    return queryObject;
};

const requestUrlExtractor = (request) => {

    const requestUrlCollection      = request.url.split('/');

    const requestUrlSegmentCount    = requestUrlCollection.length; // 2 // 3
    const lastSegmentIndex          = requestUrlSegmentCount - 1;

    const requestUrlCollectionQuery = requestUrlCollection[lastSegmentIndex].split('?');
    const queryParameterSegment     = parseQueryString(requestUrlCollectionQuery[1]);

    const requestAction = (requestUrlSegmentCount == 2) 
                            ? requestUrlCollectionQuery[0] 
                            : requestUrlCollection[1];

    const requestFilter = (requestUrlSegmentCount == 3) 
                            ? requestUrlCollectionQuery[0] 
                            : undefined;    

    return {
        action  : requestAction,
        filter  : requestFilter,
        query   : queryParameterSegment,
        method  : request.method
    };
};


/**
 * 
 * @param {*} response 
 * @param {*} data 
 * @returns 
 */
 const json = (response, data) => {

    response.setHeader('Content-Type', 'application/json');
    return response.end(JSON.stringify(data));
};

const processBodyStreamRequest = (type, request, callback) => {
    
    let dataStream = [];

    request.on('data', (data) => {
        dataStream.push(data.toString());
    });

    request.on('end', (data) => {

        if(type == 'json') callback(JSON.parse(dataStream.join('')));
        if(type == 'text') callback(dataStream.join(''));
    });
}


const bodyParser = {};
bodyParser.json = (request, callback) => {
    processBodyStreamRequest('json', request, callback);
};

bodyParser.text = (request, callback) => {
    processBodyStreamRequest('text', request, callback);
};

module.exports = {
    requestUrlExtractor,
    json,
    bodyParser
};