const userModel     = require('../models/user.model');
const jwt           = require('jsonwebtoken');
const SECRET_KEY    = "SUPER_SPECIAL_SECRET";

const signUpNewUser = (dispatcher) => {

    userModel.create(dispatcher.getBody(), (error, result) => {

        if(error && error.code == 'ER_DUP_ENTRY') return dispatcher.json({
            'message': 'Username or email already exists',
            'status' : '404'
        }, 404);

        if(error)  return dispatcher.json({
            'message': 'Operation failed',
            'reasone': error,
            'status' : '404'
        }, 404);

        return dispatcher.json({
            'message': 'User succesfuly singned up'
        });
    });
};


const singInUser = (dispatcher) => {
    
    userModel.auth(dispatcher.getBody(), (error, result) => {

        if(error) return dispatcher.json({
            message: 'Operation failed'
        });

        if(result.length == 0) return dispatcher.json({
            'message': 'Invalid username or password'
        });
        
        const tokken = jwt.sign({
            "username"  : result.username,
            "fname"     : result.fname,
            "lname"     : result.lname
        }, SECRET_KEY);

        return dispatcher.json({
            "tokken" : tokken
        });
    });
    
};

const serve = (dispatcher) => {

    dispatcher.post(() => {

        if(dispatcher.getFilter() == 'signup') signUpNewUser(dispatcher);
        if(dispatcher.getFilter() == 'signin') singInUser(dispatcher);
    });
};

module.exports = {
    serve   
};