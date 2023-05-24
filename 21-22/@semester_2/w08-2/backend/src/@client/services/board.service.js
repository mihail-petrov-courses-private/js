const qb    = require('../../@system/database/builder');
const model = require('../models/board.model');
const token = require('../../@system/token');

/**
 * @author Mihail Petrov
 * @param {*} callback 
 */
exports.getAll = (workspaceId) => {

    return qb.select(model.table)
            .where(model.$ownerId, token.getUserId())
            .andWhere(model.$workspaceId, workspaceId)
            .exec();
};

/**
 * @author Mihail Petrov
 * @param {*} id 
 * @param {*} callback 
 */
exports.get = (id) => {
    
    return qb.select(model.table)
        .where(model.$id, id)
        .andWhere(model.$ownerId, token.getUserId())
        .exec();
};

/**
 * @author Mihail Petrov
 * @param {*} object 
 * @param {*} callback 
 */
exports.create = async (object) => {

    const dbResult = await qb.insert(model.table, model.$$create(object))
                            .exec();

    return model.$$update(object, dbResult.insertId);
};

/**
 * @author Mihail Petrov
 * @param {*} id 
 * @param {*} object 
 */
exports.update = (id) => {

    return qb.update(model.table, model.$$create(object))
        .where(model.$id, id)
        .andWhere(model.$ownerId, token.getUserId())
        .exec();
};

/**
 * @author Mihail Petrov
 * @param {*} id 
 * @param {*} callback 
 */
exports.remove = (id) => {
    return qb.delete(model.table)
            .where(model.$id, id)
            .andWhere(model.$ownerId, token.getUserId())
            .exec();
};