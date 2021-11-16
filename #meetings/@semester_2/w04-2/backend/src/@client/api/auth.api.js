const authServiceApi = require('../services/auth.service');
const router         = require('express').Router();

const MESSAGES          = {
    NO_DATA_FOUND       : { message: `No workflow found`            },
    OPERATION_FAILED    : { message: `Operration failed`            },
    SUCCESS_CREATION    : { message: `User sign up succesfuly` },
    SUCCESS_REMOVAL     : { message: `Workflow removed successfuly` },
    NO_AFFECTED_ROWS    : { message: `Workflow was already removed` },
};

router.post('/signin', (request, response) => {
    // load 
});

router.post('/signup', async (request, response) => {

    try {
        await authServiceApi.createUser(request.body);
        response.ok(MESSAGES.SUCCESS_CREATION);
    }
    catch(error) {
        console.log(error); 
        response.badRequest(MESSAGES.OPERATION_FAILED);
    }
});

module.exports = router;