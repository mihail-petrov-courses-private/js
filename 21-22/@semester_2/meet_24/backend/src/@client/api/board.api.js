const router            = require('express').Router();
const boardService      = require('../services/board.service');
const listService       = require('../services/list.service');
const cardService       = require('../services/card.service');

const MESSAGES          = {
    NO_DATA_FOUND       : { message: `No board found`            },
    OPERATION_FAILED    : { message: `Operration failed`         },
    SUCCESS_CREATION    : { message: `board created successfuly` },
    SUCCESS_REMOVAL     : { message: `board removed successfuly` },
    NO_AFFECTED_ROWS    : { message: `board was already removed` },
};

/**
 * GET
 * url: /boards
 * get all boards
 */
router.get('/', async (request, response) => {

    try {
        const workspaceId = request.query.workspaceid;
        const collection = await boardService.getAll(workspaceId);
        response.ok(collection);
    }
    catch(error) {
        response.notFound(MESSAGES.NO_DATA_FOUND);
    }
});

/**
 * GET
 * url: /boards/:id
 * get single board
 */
router.get('/:id', async (request, response) => {

    try {
        const boardId       = request.params['id'];
        const httpResult    = await boardService.get(boardId);
        response.ok(httpResult);
    }
    catch(error) {
        response.notFound(MESSAGES.NO_DATA_FOUND);
    }
});

/**
 * GET
 * url: /boards/:id/list
 * get single board
 */
 router.get('/:id/list', async (request, response) => {

    try {
        const boardId       = request.params['id'];
        const httpResult    = await listService.getAll(boardId);
        response.ok(httpResult);
    }
    catch(error) {
        response.notFound(MESSAGES.NO_DATA_FOUND);
    }
});

/**
 * GET
 * url: /boards/:id/list/:id/card
 * get single board
 */
 router.get('/:id/list/:listid/card', async (request, response) => {

    try {
        const boardId       = request.params['id'];
        const listId        = request.params['listid'];
        const httpResult    = await cardService.getAll(listId);
        response.ok(httpResult);
    }
    catch(error) {
        response.notFound(MESSAGES.NO_DATA_FOUND);
    }
});

/**
 * POST
 * url: /boards
 * create new board
 */
router.post('/', async (request, response) => {

    try {
        const entity        = await boardService.create(request.body);
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

router.post('/:id/list', async (request, response) => {

    try {
        const boardId       = request.params['id'];
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

router.post('/:id/list/:listid/card', async (request, response) => {

    try {
        const boardId       = request.params['id'];
        const listId        = request.params['listid'];
        const requestBody   = { listId, ...request.body };
        const entity        = await cardService.create(requestBody);
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
 * PUT
 * url: /boards/:id
 * update existing board
 */
router.put('/:id', async (request, response) => {

    try {
        const boardId    = request.params['id'];
        const httpResult = await boardService.update(boardId, request.body);
        response.ok(httpResult);
    }
    catch(error) {
        response.badRequest(MESSAGES.OPERATION_FAILED);
    }
});

/**
 * PUT
 * url: /boards/:id
 * update existing board
 */
 router.put('/:id/list/:listid', async (request, response) => {

    try {
        const boardId    = request.params['id'];
        const listId     = request.params['listid'];
        const httpResult = await listService.update(boardId, listId, request.body);
        response.ok(httpResult);
    }
    catch(error) {
        response.badRequest(MESSAGES.OPERATION_FAILED);
    }
});

/**
 * DELETE
 * url: /boards/:id
 * remove existing board
 */
router.delete('/:id', async (request, response) => {

    try {
        const httpRequest = await boardService.remove(request.params['id']);
        const message     = (httpRequest.affectedRows == 0) 
                            ? MESSAGES.NO_AFFECTED_ROWS
                            : MESSAGES.SUCCESS_REMOVAL;

        response.ok(message);
    }
    catch(error) {
        response.badRequest(MESSAGES.OPERATION_FAILED);
    }
});

/**
 * DELETE
 * url: /boards/:id
 * remove existing board
 */
 router.delete('/:id/list/:listid', async (request, response) => {

    try {
        const boardId       = request.params['id'];
        const listId        = request.params['listid'];        
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