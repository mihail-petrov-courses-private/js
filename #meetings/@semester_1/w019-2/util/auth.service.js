const jwt           = require('jsonwebtoken');
const SECRET_KEY    = "SUPER_SPECIAL_SECRET";

const sign      = (payload) => jwt.sign(payload, SECRET_KEY);
const verify    = (tokken)  => jwt.verify(tokken, SECRET_KEY);

module.exports = {
    sign, 
    verify
};