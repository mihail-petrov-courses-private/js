const modelService = require('../../@system/model');
const crypto       = require('crypto');

const TABLE     = 'td_users';
const COLUMNS   = {
    id          : {name: 'id'        , type: 'number' },
    email       : {name: 'email'     , type: 'string' },
    fullName    : {name: 'full_name' , type: 'string', key: 'fullName' },
    password    : {name: 'password'  , type: 'string' },
    isActive    : {name: 'is_active' , type: 'number', key: 'isActive', default: 1 }
};

exports.table       = TABLE;
exports.columns     = COLUMNS;
exports.$id         = COLUMNS.id.name;
exports.$email      = COLUMNS.email.name;
exports.$fullName   = COLUMNS.fullName.name;
exports.$password   = COLUMNS.password.name;
exports.$isActive   = COLUMNS.isActive.name;


exports.$$create = (parsableObject) => {

    const hashPassword = crypto.createHash("sha256")
                        .update(parsableObject[COLUMNS.password.name])
                        .digest('hex');

    parsableObject[COLUMNS.password.name] = hashPassword;

    return modelService.parse(parsableObject, [
        COLUMNS.email,
        COLUMNS.fullName,
        COLUMNS.password,
        COLUMNS.isActive
    ]);
};