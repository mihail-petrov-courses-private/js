exports.queryParameterInterface = (request, response, next) => {

    request.getQueryWorkspaceId = () => {
        return request.query.workspaceid;
    }

    request.getQueryBoardId = () => {
        return request.query.boardid;
    }

    request.getQueryListId = () => {
        return request.query.listid;
    }

    request.getQueryCardId = () => {
        return request.query.cardid;
    }    

    next();
};