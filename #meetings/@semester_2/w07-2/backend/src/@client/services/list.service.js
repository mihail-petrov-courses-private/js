const qb    = require('../../@system/database/builder');
const model = require('../models/list.model');

/**
 * @author Mihail Petrov
 * @param {*} callback 
 */
exports.getAll = (boardId) => {

    return qb.select(model.table)
            .where(model.$boardId, boardId)
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
exports.update = (boardId, listId, object) => {

    return qb.update(model.table, model.$$create(object))
        .where(model.$id, listId)
        .andWhere(model.$boardId, boardId)
        .exec();
};

/**
 * @author Mihail Petrov
 * @param {*} id 
 * @param {*} callback 
 */
exports.remove = (boardId, listId) => {
    return qb.delete(model.table)
            .where(model.$id, listId)
            .andWhere(model.$boardId, boardId)
            .exec();
};