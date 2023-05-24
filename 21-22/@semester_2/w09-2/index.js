process.env.APP_PATH = __dirname;
process.env.FE_PATH  = `${__dirname}/frontend/`;
process.env.FE_SRC   = `${process.env.FE_PATH}/dest`;
process.env.FE_STYLE = `${process.env.FE_PATH}/style`;
process.env.FE_TEST  = `${process.env.FE_PATH}/test`;

process.env.BE_PATH  = `${__dirname}/backend`;
process.env.BE_SRC   = `${process.env.BE_PATH}/src`;
process.env.BE_TEST  = `${process.env.BE_PATH}/test`;

const server = require('./backend/src/server');
server.listen(8223);