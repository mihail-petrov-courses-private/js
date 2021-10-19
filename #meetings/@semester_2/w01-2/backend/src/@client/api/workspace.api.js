const router            = require('express').Router();
const workspaceService  = require('../services/workspace.service');

router.get('/', (request, response) => {

    workspaceService.getAll((error, collection) => {
        response.json(collection);
    });
});

router.get('/:id', (request, response) => {

    workspaceService.get(request.params['id'], (error, collection) => {
        response.json(collection);
    });
});

router.post('/', (request, response) => {

    workspaceService.create(request.body, (error, resultObject) => {

        if(error) {
            return response.status(400).json({
                message: 'Opperation cannot compleate'
            });    
        }

        return response.status(200).json({
            message: 'Workflow created successfuly'
        })
    });
});

router.put('/:id', (request, response) => {
    workspaceService.update(request.params['id'], request.body, (error, resultObject) => {
        response.json(resultObject);
    });
});

router.delete('/:id', (request, response) => {
    workspaceService.remove(request.params['id'], (error, result) => {
        response.json(result);
    });
})


module.exports = router;