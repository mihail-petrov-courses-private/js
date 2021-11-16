const qb    = require('../../@system/database/builder');
const model = require('../models/auth.model');

exports.createUser = (userModel) => {
    return qb.insert(model.table, model.$$create(userModel))
        .exec();
};