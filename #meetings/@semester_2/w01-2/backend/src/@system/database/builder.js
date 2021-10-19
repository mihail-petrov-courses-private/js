const databaseManager  = require('./manager.js');
const chalk            = require('chalk');

const queryBuilderReference = {};

// SELECT
// SELECT * FROM products 
let query = [];

// select('product').where('id', 5).build()
queryBuilderReference.select = (table, ...column) => {
    
    const columnCollection = (column.length == 0) ? '*' : column.join(',')
    query.push(`SELECT ${columnCollection} FROM ${table}`);
    return queryBuilderReference;
};

// 1. WHERE id = ${id}
// 2. WHERE id = 1 AND title = 'Ivan'
queryBuilderReference.where = (column, value) => {

    query.push(`WHERE ${column} = ${value}`);
    return queryBuilderReference;
};

queryBuilderReference.andWhere = (column, value) => {

    query.push(`AND ${column} = ${value}`);
    return queryBuilderReference;
};

queryBuilderReference.orWhere = (column, value) => {

    query.push(`OR ${column} = ${value}`);
    return queryBuilderReference;
};

queryBuilderReference.limit = (limit = 5) => {

    if(limit) query.push(`LIMIT ${limit}`);
    return queryBuilderReference;
};

queryBuilderReference.offset = (offset) => {

    if(offset) query.push(`OFFSET ${offset}`);
    return queryBuilderReference;
};

queryBuilderReference.page = (pageIndex, limit = 5) => {

    if(!pageIndex) {
        return queryBuilderReference;
    }

    const offsetIndex = limit * (pageIndex - 1);
    queryBuilderReference.limit(limit);
    queryBuilderReference.offset(offsetIndex);
    return queryBuilderReference;
};


// INSERT
// INSERT INTO products(title, category, sub_category)
// VALUES('${object.title}', '${object.category}', '${object.subCategory}')
queryBuilderReference.insert = (table, columnValueReference) => {

    if(!table) {
        console.log(chalk.red(`Missing table name in [INSERT QUERY BUILDER]`));
        throw new Error(`Missing table name in [INSERT QUERY BUILDER]`);
    }

    if(!columnValueReference) {
        console.log(chalk.red(`Missing column reference [INSERT QUERY BUILDER]`));
        throw new Error(`Missing column reference [INSERT QUERY BUILDER]`);
    }

    const insertColumns = (Object.keys(columnValueReference)).join(',');
    const insertValues  = (Object.values(columnValueReference)).join(',');

    query.push(`INSERT INTO ${table}`);
    query.push(`(${insertColumns})`);
    query.push(`VALUES(${insertValues})`);
    return queryBuilderReference;
};


// UPDATE
// UPDATE products
//  SET 
//  title           = '${object.title}',
//  category        = '${object.category}',
//  sub_category    = '${object.subCategory}'
 // WHERE id       = ${id}
 queryBuilderReference.update = (table, columnValueReference) => {

    const columnValueCollection = [];
    for(const key in columnValueReference) {
        columnValueCollection.push(`${key} = ${columnValueReference[key]}`);
    }

    query.push(`UPDATE ${table}`);
    query.push(`SET`);
    query.push(columnValueCollection.join(', '));

    return queryBuilderReference;
 };

// DELETE
// DELETE FROM products where id = ${id}`
queryBuilderReference.delete = (table) => {

    query.push(`DELETE FROM ${table}`);
    return queryBuilderReference;
};

queryBuilderReference.build = () => {

    const resultQuery = query.join(' ');
    query = [];
    return resultQuery; 
};


queryBuilderReference.exec = (callback) => {

    const query = queryBuilderReference.build();
    console.log(chalk.blue(query));
    databaseManager.query(query, (error, collection) => {
        callback(error, collection);
    });
}

module.exports = queryBuilderReference;