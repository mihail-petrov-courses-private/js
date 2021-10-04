const db = require('../database/manager.js');

/**
 * 
 * @param {*} options 
 * @returns 
 */
const get = (options, callback) => {

    let query = `SELECT * FROM products `;
    if(options && options.limit) {
        query += ` LIMIT ${options.limit}`;
    }

    db.query(query, (error, collection) => {
        callback(error, collection);
    });
};

/**
 * 
 * @param {*} id 
 * @returns 
 */
const findById = (id, callback) => {

    db.query(`
        SELECT * FROM products 
        WHERE id = ${id}`, (error, collection) => {
        callback(error, collection);
    });
};

/**
 * 
 * @param {*} object 
 */
const create = (object, callback) => { // INSERT

    db.query(`
        INSERT INTO products(title, category, sub_category)
        VALUES('${object.title}', '${object.category}', '${object.subCategory}')
    `, (error, result) => {

        if(result) {
            object.id = result.insertId;
        }

        callback(error, object);
    });
};

/**
 * 
 * @param {*} id 
 * @param {*} object 
 * @returns 
 */
const update = (id, object) => { // UDATE

    db.query(
        `UPDATE products
        SET title     = ${object.title},
        category      = ${object.category}
        subCategory   = ${object.subCategory}
        options       = ${object.options}
        WHERE id = ${id}`
        , (error, result) => {
            callback(error, object);
        });
};

/**
 * 
 * @param {*} id 
 */
const remove = (id, callback) => { // DELETE
    
    db.query(`
        DELETE FROM products where id = ${id}`
        , (error, result) => {
        callback(error, result);
    });
};

module.exports = {
    get, 
    findById,
    create,
    update,
    remove
};