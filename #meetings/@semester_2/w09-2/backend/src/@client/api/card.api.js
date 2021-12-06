const router            = require('express').Router();
const cardService       = require('../services/card.service');

const MESSAGES          = {
    NO_DATA_FOUND       : { message: `No board found`            },
    OPERATION_FAILED    : { message: `Operration failed`         },
    SUCCESS_CREATION    : { message: `board created successfuly` },
    SUCCESS_REMOVAL     : { message: `board removed successfuly` },
    NO_AFFECTED_ROWS    : { message: `board was already removed` },
};

/**
 * GET /card/
 * get all cards
 * > ?boardid
 */
 router.get('/', async (request, response) => {

    try {
        const boardId       = request.getQueryBoardId();
        const httpResult    = await cardService.getAll(boardId);
        response.ok(httpResult);
    }
    catch(error) {
        response.notFound(MESSAGES.NO_DATA_FOUND);
    }
});


/**
 * GET /card/:id/
 * get cingle card
 */
 router.get('/:id', async (request, response) => {

    try {
        const boardId       = request.getQueryBoardId();
        const cardId        = request.params['id'];
        const httpResult    = await cardService.get(boardId, cardId);
        response.ok(httpResult);
    }
    catch(error) {
        response.notFound(MESSAGES.NO_DATA_FOUND);
    }
});

/**
 * POST /card/
 * create new card
 */
router.post('/', async (request, response) => {

    try {
        const boardId       = request.getQueryBoardId();
        const listId        = request.getQueryListId();
        const requestBody   = { boardId, listId, ...request.body };
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

module.exports = router;