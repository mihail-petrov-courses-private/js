// 0. Извикване на библиотека за работа с файлове
const fileSystemLibrary     = require("fs");
const FILE_PATH             = "C:\\Users\\Mihail\\Desktop\\sandbox\\";
const FILE_PATH_ORIGIN      = `${FILE_PATH}file_origin`;
const FILE_PATH_DESTINATION = `${FILE_PATH}file_destination`; 
const SEPARATOR             = `\\`;

const extractPath = (path, extra) => {
    return (extra) 
    ?  `${path}${SEPARATOR}${extra}`
    :  `${path}`;    
};

const paths       = {};
paths.sandbox     = (extra) => extractPath(FILE_PATH              , extra); // return
paths.origin      = (extra) => extractPath(FILE_PATH_ORIGIN       , extra); // return
paths.destination = (extra) => extractPath(FILE_PATH_DESTINATION  , extra); // return


const isFile = (fileTitle) => {

    // с използване на метода split
    // const collection = fileTitle.split('.');
    // return collection.length > 1;

    // с използване на метода includes
    return fileTitle.includes('.');
};

const isDirectory = (fileTitle) => {

    // ако не съм файл значи съм директория
    return !isFile(fileTitle);
};


const isDirectoryAvailable = (path) => {
    return fileSystemLibrary.existsSync(path);
};

const isFileExtentionAvailable = (extention) => {

    const lowerExtention = extention.toLowerCase();
    return ['txt', 'png', 'jpg'].includes(lowerExtention);
};

const file = (fileTitle) => {

    const fileSegmentCollection = fileTitle.split('.');
    const fileSegmentCount      = fileSegmentCollection.length;
    const name                  = fileSegmentCollection[0];
    const extention             = fileSegmentCollection[fileSegmentCount - 1];

    return { name, extention };
}

// 1.1. Проверяваме дали директорията е налична и я изтриваме предварително
if(isDirectoryAvailable(paths.destination())) {
    fileSystemLibrary.rmdirSync(paths.destination(), { recursive: true, force: true});    
}

// 1.2. Създаване на нова директория, която ще съдържа подредените файлове
fileSystemLibrary.mkdirSync(paths.destination());

// 1. ИСкам да намеря всички файлове които се намират в определена директроия в рамките
// на моя компютър
const originFileCollection = fileSystemLibrary.readdirSync(paths.origin());

// 2. Искам да обходя намерените файлове
for(fileTitle of originFileCollection) {

    if(isFile(fileTitle)) {

        const fileReference = file(fileTitle);

        if(isFileExtentionAvailable(fileReference.extention)) {

            const destinationDirectoryPath  = paths.destination(fileReference.extention);
            const filePathOrigin            = paths.origin(fileTitle);
            const filePathDestination       = `${destinationDirectoryPath}\\${fileTitle}`;
            
            if(!isDirectoryAvailable(destinationDirectoryPath)) {
                fileSystemLibrary.mkdirSync(destinationDirectoryPath);
            }
    
            fileSystemLibrary.copyFileSync(filePathOrigin, filePathDestination);
        }
    }
}

console.log('*');
console.log('Script finish successfuly !!!!');