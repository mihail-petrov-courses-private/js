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
        query   : queryParameterSegment
    };
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


const DispatcherManager = function(request, response) {

    const requestProcessor = requestUrlExtractor(request)

    this.httpRequest    = request;
    this.httpResponse   = response;
    this.requestAction  = requestProcessor.action; 
    this.requestFilter  = requestProcessor.filter;
    this.requestQuery   = requestProcessor.query;
};

DispatcherManager.prototype.getMethod = function() {
    return this.httpRequest.method;
};

DispatcherManager.prototype.get = function(callback) {
    if(this.getMethod() == 'GET') callback();
};

DispatcherManager.prototype.post = function(callback) {

    if(this.getMethod() == 'POST') {
        bodyParser.json(this.httpRequest, (parsedBody) => {
            this.httpRequestBody = parsedBody;
            callback();
        });
    }
};

DispatcherManager.prototype.put = function(callback) {

    if(this.getMethod() == 'PUT') {
        bodyParser.json(this.httpRequest, (parsedBody) => {
            this.httpRequestBody = parsedBody;
            callback();
        });
    }
};

DispatcherManager.prototype.delete = function(callback) {
    if(this.getMethod() == 'DELETE') callback();
};

DispatcherManager.prototype.json = function(data, statusCode = 200) {

    this.httpResponse.setHeader('Content-Type', 'application/json');
    this.httpResponse.statusCode = statusCode;
    this.httpResponse.end(JSON.stringify(data));
    console.log('>>>>> Response sended');
};

DispatcherManager.prototype.getBody = function() {
    return this.httpRequestBody;
};

DispatcherManager.prototype.getAction = function() {
    return this.requestAction;
};

DispatcherManager.prototype.action = function(action, callback) {
    if(this.getAction() == action) callback();
};

DispatcherManager.prototype.serve = function(callback) {

    console.log('@@@============');
    console.log(this.httpResponse);
    console.log('@@@');


    if(!this.httpResponse.writableEnded) callback();
};


DispatcherManager.prototype.getFilter = function() {
    return this.requestFilter;
};

DispatcherManager.prototype.getQuery = function() {
    return this.requestQuery;
};

const Dispatch = (request, response) => {
    return new DispatcherManager(request, response);
};

module.exports = {
    Dispatch
};