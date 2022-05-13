const fs = require("fs");

const isFile = (fileTitle) => {
    return fileTitle.includes('.');
};

const isDirectory = (fileTitle) => {
    return !isFile(fileTitle);
};

const isDirectoryAvailable = (path) => {
    return fs.existsSync(path);
};

const isFileExtentionAvailable = (extention) => {

    const lowerExtention = extention.toLowerCase();
    return ['txt', 'png', 'jpg'].includes(lowerExtention);
};

module.exports = {
    isFile, isDirectory, isDirectoryAvailable, isFileExtentionAvailable
};