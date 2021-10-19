const qb            = require('../../@system/database/builder');
const workflowModel = require('../models/workspace.model');

/**
 * @author Mihail Petrov
 * @param {*} callback 
 */
exports.getAll = (callback) => {

    qb.select(workflowModel.table())
    .exec(callback);
};

/**
 * @author Mihail Petrov
 * @param {*} id 
 * @param {*} callback 
 */
exports.get = (id, callback) => {
    
    qb.select(workflowModel.table())
        .where(workflowModel.$id(), id)
        .exec(callback);
};

/**
 * @author Mihail Petrov
 * @param {*} object 
 * @param {*} callback 
 */
exports.create = (object, callback) => {

    qb.insert(workflowModel.table(), workflowModel.$$create(object))
        .exec((error, result) => {  callback(error, result) });
};

/**
 * @author Mihail Petrov
 * @param {*} id 
 * @param {*} object 
 */
exports.update = (id, object) => {

    qb.update(workflowModel.table(), workflowModel.$$create(object))
        .where(workflowModel.$id(), id)
        .exec((error, result) => { 
            result.id = object.id;
            callback(error, result);
        });
};

/**
 * @author Mihail Petrov
 * @param {*} id 
 * @param {*} callback 
 */
exports.remove = (id, callback) => {
    qb.delete(workflowModel.table())
        .where(workflowModel.$id(), id)
        .exec(callback);
};