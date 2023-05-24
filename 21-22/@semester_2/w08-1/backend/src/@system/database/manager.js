const mysql             = require('mysql');

// 1. Връзка към базата данни
const mysqlDatabase = mysql.createConnection({
    host        : 'localhost',
    user        : 'root',
    password    : '',
    database    : 'mrello_db'
});

mysqlDatabase.connect((error) => {

    if(error) {
        return console.log(error);
    }

    console.log('Success connection');
});

const query = (sql, callback) => {
    mysqlDatabase.query(sql, callback);
};


const truncate = (table) => {

    return new Promise((resolve, reject) => {
        query(`TRUNCATE ${table}`, (error, result) => {

            if(error) return reject(error);
            resolve(result);
        });
    });
};


module.exports = {
    query,
    truncate
};