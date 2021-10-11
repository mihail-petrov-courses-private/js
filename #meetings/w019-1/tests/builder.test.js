const qb    = require('../database/builder');
const test  = require('./test.manager');

test('Select query builder', 
     qb.select('products').build(), 
     'SELECT * FROM products'
);

test('Select query builder with specific columns', 
     qb.select('products', 'id', 'title').build(),
     'SELECT id,title FROM products'     
);

test('Select query builder with specific columns and simple where statment', 
     qb.select('products', 'id', 'title').where('id', 5).build(),
     'SELECT id,title FROM products WHERE id = 5'
);

test('Select query builder with specific columns and simple where / and statment', 
     qb.select('products', 'id', 'title').where('id', 5).andWhere('title', `'NEO'`).build(),
     `SELECT id,title FROM products WHERE id = 5 AND title = 'NEO'`
);

test('INSERT query',
     qb.insert('products', {'id': 1, 'title': `'NEO'`}).build(),
     `INSERT INTO products (id,title) VALUES(1,'NEO')`
);

test('Update query for all record',
     qb.update('products', {'id': 1, 'title': `'NEO'`}).build(),
     `UPDATE products SET id = 1, title = 'NEO'`
);

test('Update query for specific records',
     qb.update('products', {'id': 1, 'title': `'NEO'`}).where('id', 1).build(),
     `UPDATE products SET id = 1, title = 'NEO' WHERE id = 1`
);

test('DELETE all queries',
     qb.delete('products').build(),
     `DELETE FROM products`
);

test('DELETE query for specific records',
     qb.delete('products').where('id', 1).build(),
     `DELETE FROM products WHERE id = 1`
);