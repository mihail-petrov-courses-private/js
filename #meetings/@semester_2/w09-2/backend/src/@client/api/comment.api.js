const router            = require('express').Router();
const commentService    = require('../services/comment.service');

const MESSAGES          = {
    NO_DATA_FOUND       : { message: `No board found`            },
    OPERATION_FAILED    : { message: `Operration failed`         },
    SUCCESS_CREATION    : { message: `board created successfuly` },
    SUCCESS_REMOVAL     : { message: `board removed successfuly` },
    NO_AFFECTED_ROWS    : { message: `board was already removed` },
};

/**
 * GET /comment/
 * get all comment
 * > ?boardid
 */
 router.get('/', async (request, response) => {

    try {
        const cardId        = request.getQueryCardId();
        const httpResult    = await commentService.getAll(cardId);
        response.ok(httpResult);
    }
    catch(error) {
        response.notFound(MESSAGES.NO_DATA_FOUND);
    }
});

/**
 * POST /card/
 * create new comment
 */
router.post('/', async (request, response) => {

    try {
        const boardId       = request.getQueryBoardId();
        const listId        = request.getQueryListId();
        const requestBody   = { boardId, listId, ...request.body };
        const entity        = await commentService.create(requestBody);
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