const fs    = require('fs');
const http  = require('http');
let tiketId = 1;

const server = http.createServer((request, response) => {

    const toketStringId = tiketId++;
    fs.writeFileSync(`./file_tiket_id_${tiketId}.txt`, toketStringId.toString());
    response.end(`Tiket id ${toketStringId}`);
});

server.listen(5173); // http://localhost:5173
console.log("Start");