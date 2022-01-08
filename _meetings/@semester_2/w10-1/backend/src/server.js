const express       = require('express');
const app           = express();
const authApi       = require('./@client/api/auth.api');
const workspaceApi  = require('./@client/api/workspace.api');
const boardApi      = require('./@client/api/board.api');
const listApi       = require('./@client/api/list.api');
const cardApi       = require('./@client/api/card.api');
const commentApi    = require('./@client/api/comment.api');
const token         = require('./@system/token');

const requestMiddleare  = require('./@system/middleware/request');
const responseMiddleare = require('./@system/middleware/response');

app.use(express.json())

app.use('/style'    , express.static(`${process.env.FE_STYLE}/`))
app.use('/dest'     , express.static(`${process.env.FE_SRC}/`))

app.use(requestMiddleare.queryParameterInterface);
app.use(responseMiddleare.responseHttpWrapper);

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
    console.log('AAA');
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
app.use('/api/auth'      , authApi);
app.use('/api/workspace' , workspaceApi);
app.use('/api/board'     , boardApi);
app.use('/api/list'      , listApi);
app.use('/api/card'      , cardApi);
app.use('/api/comment'   , commentApi);

module.exports = app;