const jwt            = require('jsonwebtoken');
const SECRET_KEY     = "SSsp7vVDuRK9yaGf3xRG";

let currentPayload = null;

exports.set = (payload) => {
    return jwt.sign(payload, SECRET_KEY);
};

exports.verify = (token) => {

    currentPayload = jwt.verify(token, SECRET_KEY);
    return currentPayload;
}

exports.getUserId = () => {
    return currentPayload.id;
};

exports.getUserEmail = () => {
    return currentPayload.email;
};