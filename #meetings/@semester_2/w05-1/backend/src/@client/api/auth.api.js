const authServiceApi = require('../services/auth.service');
const router         = require('express').Router();
const jwt            = require('jsonwebtoken');
const SECRET_KEY     = "SSsp7vVDuRK9yaGf3xRG";

const MESSAGES          = {
    NO_DATA_FOUND       : { message: `No workflow found`            },
    OPERATION_FAILED    : { message: `Operration failed`            },
    SUCCESS_CREATION    : { message: `User sign up succesfuly`      },
    SUCCESS_SIGNIN      : { message: `User signed in succesfuly`    },
    NO_AFFECTED_ROWS    : { message: `Workflow was already removed` },
};

router.post('/signin', async (request, response) => {

    try {
        const user = await authServiceApi.findUser(request.body);

        if(user.length != 1) {
            return response.badRequest(MESSAGES.OPERATION_FAILED);
        }

        const payload = {
            id      : user.id,
            email   :  user.email
        };

        const authTokken = jwt.sign(payload, SECRET_KEY);
        response.ok({
            message     : MESSAGES.SUCCESS_SIGNIN.message,
            authToken   : authTokken
        });
    }
    catch(error) {
        response.badRequest(MESSAGES.OPERATION_FAILED);
    }

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