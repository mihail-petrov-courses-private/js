const router            = require('express').Router();
const boardService      = require('../services/board.service');

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
        console.log(request.query);
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
        const httpResult = await boardService.get(request.params['id']);
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

/**
 * PUT
 * url: /boards/:id
 * update existing board
 */
router.put('/:id', async (request, response) => {

    try {
        const httpResult = await boardService.update(request.params['id'], request.body);
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

module.exports = router;