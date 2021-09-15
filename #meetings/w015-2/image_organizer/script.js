const fs        = require("fs");
const fileUtil  = require("./file.util.js");
const paths     = require('./path.config.js');
const traverse  = require('./traverse.js');

// 1.1. Проверяваме дали директорията е налична и я изтриваме предварително
if(fileUtil.isDirectoryAvailable(paths.destination())) {
    fs.rmdirSync(paths.destination(), { recursive: true, force: true});    
}

// 1.2. Създаване на нова директория, която ще съдържа подредените файлове
fs.mkdirSync(paths.destination());

// обхождане и обработка
traverse(paths.origin());

console.log('*');
console.log('Script finish successfuly !!!!');