const fs = require('fs');
const ROOT_DIR = './frontend/src';
const DEST_DIR = './frontend/dest';

const isTemplate = (file) => {
    return file.includes(".html");
}

const isDirectory = (path) => {

    const fileStatus = fs.lstatSync(path);
    return fileStatus.isDirectory();
}

const processFile = (dirPath) => {

    const fileCollection = fs.readdirSync(dirPath);

    for(const fileLocator of fileCollection) {


        const path = `${dirPath}/${fileLocator}`;
        if(isDirectory(path)) {
            processFile(path);
        }
        
        if(isTemplate(fileLocator)) {

            const destPath = dirPath.replace(ROOT_DIR, DEST_DIR);

            if(!fs.existsSync(destPath)) {
                fs.mkdirSync(destPath, { recursive: true });
            }

            const srcLocation   = path;
            const destLocation  = path.replace(ROOT_DIR, DEST_DIR);

            fs.copyFileSync(srcLocation, destLocation);
        }
    }
};

processFile(ROOT_DIR);