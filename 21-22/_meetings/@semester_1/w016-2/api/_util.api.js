const endpointNotFound = (response, requestExtractInstance) => {

    response.setHeader('Content-Type', 'application/json');
    response.statusCode = 404;
    response.end(JSON.stringify({
        messagage: 'No sutable end point found'
    }));
}


module.exports = {
    endpointNotFound
}