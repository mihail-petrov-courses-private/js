const router            = require('express').Router();
const workspaceService  = require('../services/workspace.service');


const MESSAGES          = {
    NO_DATA_FOUND       : { message: `No workflow found`            },
    OPERATION_FAILED    : { message: `Operration failed`            },
    SUCCESS_CREATION    : { message: `Workflow created successfuly` },
    SUCCESS_REMOVAL     : { message: `Workflow removed successfuly` },
    NO_AFFECTED_ROWS    : { message: `Workflow was already removed` },
};

router.get('/', async (request, response) => {

    try {
        const collection = await workspaceService.getAll();
        response.ok(collection);
    }
    catch(error) {
        response.notFound(MESSAGES.NO_DATA_FOUND);
    }
});

router.get('/:id', async (request, response) => {

    try {
        const httpResult = await workspaceService.get(request.params['id']);
        response.ok(httpResult);
    }
    catch(error) {
        response.notFound(MESSAGES.NO_DATA_FOUND);
    }
});

router.post('/', async (request, response) => {

    try {
        const entity        = await workspaceService.create(request.body);
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

router.put('/:id', async (request, response) => {

    try {
        const httpResult = await workspaceService.update(request.params['id'], request.body);
        response.ok(httpResult);
    }
    catch(error) {
        response.badRequest(MESSAGES.OPERATION_FAILED);
    }
});

router.delete('/:id', async (request, response) => {

    try {
        const httpRequest = await workspaceService.remove(request.params['id']);
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