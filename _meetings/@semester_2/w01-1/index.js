const express   = require('express');
const app       = express();

app.get('/', (request, response) => {
    response.sendFile(`${__dirname}/frontend/index.html`);
});

app.listen(8223);