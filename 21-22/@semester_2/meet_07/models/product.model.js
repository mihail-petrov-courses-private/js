const productCollection = [
    { 
        id: 1, title: "Apple MapBook Pro", category: "tecknology", subCategory: "computers" , options: []
    },
    { 
        id: 574, title: "12 rules for better life", category: "books", subCategory: "psicology" , options: []
    },
    { 
        id: 811, title: "Cool T-shurt", category: "clodes", subCategory: "t-shurts" , options: []
    }
];

/**
 * 
 * @param {*} limit 
 * @returns 
 */
const extract = (limit) => {

    const collection = [];
    for(let i = 0; i < limit; i++) {
        collection.push(productCollection[i]);
    }

    return collection;
};

/**
 * 
 * @returns 
 */
const getLastId = () => {
    return productCollection[productCollection.length - 1].id;
};

/**
 * 
 * @returns 
 */
const getNextId = () => {
    return getLastId() + 10;
};

/**
 * 
 * @param {*} options 
 * @returns 
 */
const get = (options) => {

    if(options && options.limit) {

        if(options.limit > productCollection.length) {
            return productCollection;        
        }

        return extract(options.limit);
    }

    return productCollection;
};

/**
 * 
 * @param {*} id 
 * @returns 
 */
const findById = (id) => {

    const collection =  productCollection.find((element) => {
        return element.id == id;
    });

    return (collection) ? collection : [];
};


const findIndexById = (id) => {

    for(let i = 0; i < productCollection.length; i++) {
        if(productCollection[i].id == id) {
            return i;
        }
    }

    return null;
}

/**
 * 
 * @param {*} object 
 */
const create = (object) => { // INSERT

    object.id = getNextId();
    productCollection.push(object);

    return object;
};

/**
 * 
 * @param {*} id 
 * @param {*} object 
 * @returns 
 */
const update = (id, object) => { // UDATE

    let reference = findById(id);

    reference.title         = object.title;
    reference.category      = object.category;
    reference.subCategory   = object.subCategory;
    reference.options       = object.options;
    return reference;
};

/**
 * 
 * @param {*} id 
 */
const remove = (id) => { // DELETE

    const index = findIndexById(id);
    productCollection.splice(index, 1);
};

module.exports = {
    get, 
    findById,
    create,
    update,
    remove
};