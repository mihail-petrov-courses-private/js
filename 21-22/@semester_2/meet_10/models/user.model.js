const qb = require('../database/builder');

const auth = (userObject, callback) => {

    qb.select('users')
    .where('username'   , `'${userObject.username}'`)
    .andWhere('password', `'${userObject.password}'`)
    .exec(callback);
};

/**
 * 
 * @param {*} userObject 
 * @param {*} callback 
 */
const create = (userObject, callback) => {

    qb.insert('users', {
        'username'  : `'${userObject.username}'`,
        'password'  : `'${userObject.password}'`,
        'fname'     : `'${userObject.fname}'`,
        'lname'     : `'${userObject.lname}'`,
        'email'     : `'${userObject.email}'`
    }).exec((error, result) => {
        if(result) userObject.id = result.insertId;
        callback(error, userObject);
    });
};

module.exports = {
    auth,
    create
}