const qb    = require('../../@system/database/builder');
const model = require('../models/auth.model');

/**
 * @author Mihail Petrov
 * @param {*} userModel 
 * @returns 
 */
exports.createUser = (userModel) => {
    return qb.insert(model.table, model.$$create(userModel))
        .exec();
};

/**
 * @author Mihail Petrov
 * @param {*} userModel 
 * @returns 
 */
exports.findUser = (userModel) => {

    const transformUserModel = model.$$create(userModel);

    return qb.select(model.table)
            .where(model.$email         , transformUserModel.email)
            .andWhere(model.$password   , transformUserModel.password)
            .exec();
};