const express      = require('express');
const app          = express();
const workspaceApi = require('./backend/src/@client/api/workspace.api');

app.use(express.json())

app.get('/', (request, response) => {
    response.sendFile(`${__dirname}/frontend/index.html`);
});

// Workspace APi
app.use('/api/workspace', workspaceApi);

app.listen(8223);