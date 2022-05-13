const qb    = require('../../@system/database/builder');
const model = require('../models/comment.model');

/**
 * @author Mihail Petrov
 * @param {*} callback 
 */
exports.getAll = (cardId) => {

    return qb.select(model.table)
            .where(model.$cardId, cardId)
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
exports.update = (commentId, object) => {

    return qb.update(model.table, model.$$create(object))
        .where(model.$id, commentId)
        .exec();
};

/**
 * @author Mihail Petrov
 * @param {*} id 
 * @param {*} callback 
 */
exports.remove = (commentId) => {
    return qb.delete(model.table)
            .where(model.$id, commentId)
            .exec();
};