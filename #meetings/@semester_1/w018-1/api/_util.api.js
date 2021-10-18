const serve = (requestExtractInstance) => {

    requestExtractInstance.json({
        messagage: 'No sutable end point found'
    }, 404);
};

module.exports = {
    serve
}