const qb    = require('../../@system/database/builder');
const model = require('../models/card.model');

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
 * @param {*} callback 
 */
exports.get = (boardId, cardId) => {

    return qb.select(model.table)
            .where(model.$id, cardId)
            .andWhere(model.$boardId, boardId)
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
exports.update = (listId, cardId, object) => {

    return qb.update(model.table, model.$$create(object))
        .where(model.$id, cardId)
        .andWhere(model.$listId, listId)
        .exec();
};

/**
 * @author Mihail Petrov
 * @param {*} id 
 * @param {*} callback 
 */
exports.remove = (listId, cardId) => {
    return qb.delete(model.table)
            .where(model.$id, cardId)
            .andWhere(model.$listId, listId)
            .exec();
};