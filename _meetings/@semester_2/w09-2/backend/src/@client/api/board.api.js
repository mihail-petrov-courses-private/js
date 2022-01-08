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
 * GET /boards
 * get all boards
 */
router.get('/', async (request, response) => {

    try {
        const workspaceId   = request.getQueryWorkspaceId();
        const collection    = await boardService.getAll(workspaceId);
        response.ok(collection);
    }
    catch(error) {
        response.notFound(MESSAGES.NO_DATA_FOUND);
    }
});

/**
 * GET /boards/:id
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
 * POST /boards
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
 * PUT /boards/:id
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
 * DELETE /boards/:id
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