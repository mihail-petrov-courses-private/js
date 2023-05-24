const parse = (parsableObject, columnCollection) => {

    const newObject = {};
    for(const columnReference of columnCollection) {
        newObject[columnReference.name] = parseColumn(columnReference, parsableObject);
    }

    return newObject;
};

const parseColumn = (columnReference, parsableObject) => {
    
    const parsableKey = (columnReference.key) 
                        ? columnReference.key 
                        : columnReference.name;

    const value = parsableObject[parsableKey];
    
    if(columnReference.type == "string") {
        return `'${value}'`;
    }

    return `${value}`;
};


module.exports = {
    parse
};