const FILE_PATH             = "C:\\Users\\Mihail\\Desktop\\sandbox\\";
const FILE_PATH_ORIGIN      = `${FILE_PATH}file_origin`;
const FILE_PATH_DESTINATION = `${FILE_PATH}file_destination`; 
const SEPARATOR             = `\\`;

const extractPath = (path, extra) => {
    return (extra.length > 0) 
    ?  `${path}${SEPARATOR}${extra.join(SEPARATOR)}`
    :  `${path}`;
};

const paths       = {};
paths.sandbox     = (...extra)         => extractPath(FILE_PATH              , extra); // return
paths.origin      = (...extra)         => extractPath(FILE_PATH_ORIGIN       , extra); // return
paths.destination = (...extra)         => extractPath(FILE_PATH_DESTINATION  , extra); // return
paths.build       = (path, ...extra)   => extractPath(path                   , extra); // return 

module.exports = paths;