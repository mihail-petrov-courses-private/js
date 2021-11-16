const express      = require('express');
const app          = express();
const workspaceApi = require('./@client/api/workspace.api');
const authApi      = require('./@client/api/auth.api');

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

    next();
});

app.get('/', (request, response) => {
    response.sendFile(`${process.env.FE_PATH}/index.html`);
});

app.get('/template/*', (request, response) => {

    const path = request.params;
    response.sendFile(`${process.env.FE_SRC}/pages/${path[0]}`);
});

// External API
app.use('/api/workspace', workspaceApi);
app.use('/api/auth'     , authApi);


module.exports = app;