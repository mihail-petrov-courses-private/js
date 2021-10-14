const qb            = require('../database/builder');
const TABLE_NAME    = `products`;

/**
 * 
 * @param {*} options 
 * @returns 
 */
const get = (callback, options = {}) => {

    qb.select(TABLE_NAME)
    .page(options.page, options.limit)
    .exec(callback);
};

/**
 * 
 * @param {*} id 
 * @returns 
 */
const findById = (id, callback) => {

    qb.select(TABLE_NAME)
    .where('id', id)
    .exec(callback);
};

/**
 * 
 * @param {*} object 
 */
const create = (object, callback) => { // INSERT

    qb.insert(TABLE_NAME, {
        title           : `'${object.title}'`,
        category        : `'${object.category}'`,
        sub_category    : `'${object.subCategory}'`
    }).exec((error, result) => {

        if(result) object.id = result.insertId;
        callback(error, object);
    });

};

/**
 * 
 * @param {*} id 
 * @param {*} object 
 * @returns 
 */
const update = (id, object, callback) => { // UDATE

    qb.update(TABLE_NAME, {
        title           : `'${object.title}'`,
        category        : `'${object.category}'`,
        sub_category    : `'${object.subCategory}'`
    }).where('id', id).exec((error, result) => {
        callback(error, object)
    });
};

/**
 * 
 * @param {*} id 
 */
const remove = (id, callback) => { // DELETE
    
    qb.delete(TABLE_NAME)
    .where('id', id)
    .exec(callback);
};

module.exports = {
    get, 
    findById,
    create,
    update,
    remove
};