const fs        = require("fs");
const fileUtil  = require("./file.util.js");
const paths     = require('./path.config.js');
const file      = require('./file.factory.js');

const processFile = (directoryPath, fileTitle) => {
        
    const fileReference = file(fileTitle);
    
    if(fileUtil.isFileExtentionAvailable(fileReference.extention)) {

        const destinationDirectoryPath  = paths.destination(fileReference.extention);
        const filePathOrigin            = paths.build(directoryPath, fileTitle);
        const filePathDestination       = `${destinationDirectoryPath}\\${fileTitle}`;
        
        if(!fileUtil.isDirectoryAvailable(destinationDirectoryPath)) {
            fs.mkdirSync(destinationDirectoryPath);
        }
        
        fs.copyFileSync(filePathOrigin, filePathDestination);
    }
};


const traverseFilesInSpecificDirectory = (directoryPath) => {

    for(fileTitle of fs.readdirSync(directoryPath)) {

        if(fileUtil.isFile(fileTitle)) {
            processFile(directoryPath, fileTitle);
        }
    
        if(fileUtil.isDirectory(fileTitle)) {
            traverseFilesInSpecificDirectory(paths.build(directoryPath, fileTitle));
        }
    }
};


module.exports = traverseFilesInSpecificDirectory