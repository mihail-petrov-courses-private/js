/**
 * 
 * @param {*} request 
 * @param {*} response 
 * @param {*} next 
 */
 exports.responseHttpWrapper = (request, response, next) => {

    response.ok = (data) => {
        response.status(200).json(data);
    };

    response.notFound = (data) => {
        response.status(404).json(data);
    };

    response.badRequest = (data) => {
        response.status(400).json(data);
    };

    response.notAuthenticated = (data) => {
        response.status(403).json(data);
    };    

    next();
};