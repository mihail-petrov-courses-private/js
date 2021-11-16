const express      = require('express');
const app          = express();
const workspaceApi = require('./@client/api/workspace.api');
const authApi      = require('./@client/api/auth.api');
const token        = require('./@system/token');

app.use(express.json())

app.use('/style'    , express.static(`${process.env.FE_PATH}/style`))
app.use('/src'      , express.static(`${process.env.FE_PATH}/src`))

app.use((request, response, next) => {

    response.ok = (data) => {
        response.status(200).json(data);
    };

    response.notFound = (data) => {
        response.status(404).json(data);
    };

    response.badRequest = (data) => {
        response.status(400).json(data);
    };

    response.notAuthenticated = (data) => {
        response.status(403).json(data);
    };    

    next();
});

app.use((request, response, next) => {

    const authToken = request.get('authentication');
    if(!authToken) {
        return next();
    }
    
    try {
        token.verify(authToken);
        next();
    }
    catch(error) {
        response.notAuthenticated({
            message: "You cannot access this route"
        });
    }
});

app.get('/', (request, response) => {
    response.sendFile(`${process.env.FE_PATH}/index.html`);
});

app.get('/template/*', (request, response) => {

    const path = request.params;
    response.sendFile(`${process.env.FE_SRC}/pages/${path[0]}`);
});

app.get('/layouts/*', (request, response) => {

    const path = request.params;
    response.sendFile(`${process.env.FE_SRC}/layouts/${path[0]}`);
});

app.get('/dialogs/*', (request, response) => {

    const path = request.params;
    response.sendFile(`${process.env.FE_SRC}/dialogs/${path[0]}`);
});




// External API
app.use('/api/workspace', workspaceApi);
app.use('/api/auth'     , authApi);


module.exports = app;