const router            = require('express').Router();
const listService       = require('../services/list.service');

const MESSAGES          = {
    NO_DATA_FOUND       : { message: `No board found`            },
    OPERATION_FAILED    : { message: `Operration failed`         },
    SUCCESS_CREATION    : { message: `board created successfuly` },
    SUCCESS_REMOVAL     : { message: `board removed successfuly` },
    NO_AFFECTED_ROWS    : { message: `board was already removed` },
};

/**
 * GET /list
 * get all lists
 * > ?boardid
 */
 router.get('/', async (request, response) => {

    try {
        const boardId       = request.getQueryBoardId();
        const httpResult    = await listService.getAll(boardId);
        response.ok(httpResult);
    }
    catch(error) {
        response.notFound(MESSAGES.NO_DATA_FOUND);
    }
});

/**
 * POST /list
 * create new list
 * > ?boardid
 */
router.post('/', async (request, response) => {

    try {
        const boardId       = request.getQueryBoardId();
        const requestBody   = { boardId, ...request.body };
        const entity        = await listService.create(requestBody);
        const httpResponse  = {
            data : entity,
            ...MESSAGES.SUCCESS_CREATION
        };

        response.ok(httpResponse);
    }
    catch(error) {
        console.log(error);
        response.badRequest(MESSAGES.OPERATION_FAILED);
    }
});

/**
 * PUT /list/:id
 * update existing list
 * > ?boardid
 * > ?listid
 */
 router.put('/:id', async (request, response) => {

    try {
        const boardId    = request.getQueryBoardId();
        const listId     = request.getQueryListId();
        const httpResult = await listService.update(boardId, listId, request.body);
        response.ok(httpResult);
    }
    catch(error) {
        response.badRequest(MESSAGES.OPERATION_FAILED);
    }
});

/**
 * DELETE /list/:id
 * remove existing list
 * > ?boardid
 * > ?listid
 */
 router.delete('/:id', async (request, response) => {

    try {
        const boardId       = request.getQueryBoardId();
        const listId        = request.getQueryListId();
        const httpRequest   = await listService.remove(boardId, listId);
        const message       = (httpRequest.affectedRows == 0) 
                            ? MESSAGES.NO_AFFECTED_ROWS
                            : MESSAGES.SUCCESS_REMOVAL;

        response.ok(message);
    }
    catch(error) {
        response.badRequest(MESSAGES.OPERATION_FAILED);
    }
});

module.exports = router;