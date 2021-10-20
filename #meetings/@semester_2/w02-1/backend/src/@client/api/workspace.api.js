const router            = require('express').Router();
const workspaceService  = require('../services/workspace.service');
const MESSAGES          = {
    NO_DATA_FOUND       : { message: `No workflow found`            },
    OPERATION_FAILED    : { message: `Operration failed`            },
    SUCCESS_CREATION    : { message: `Workflow created successfuly` },
    SUCCESS_REMOVAL     : { message: `Workflow removed successfuly` },
    NO_AFFECTED_ROWS    : { message: `Workflow was already removed` },
};

// Get with callback
// router.get('/', (request, response) => {

//     workspaceService.getAll((error, collection) => {
//         response.json(collection);
//     });
// });

// Get with Prommise
// router.get('/', (request, response) => {

//     const result = workspaceService.getAllWithPromise();
    
//     result.then((collection) => {
//         response.status(200).json(collection);
//     });

//     result.catch((error) => {
//         response.status(404).json({
//             message: `No workflow found`
//         });
//     });
// });

// Get with Async / Await
router.get('/', async (request, response) => {

    try {
        const collection = await workspaceService.getAllAsyncAwait();
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
        await workspaceService.create(request.body);
        response.ok(MESSAGES.SUCCESS_CREATION);
    }
    catch(error) {
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