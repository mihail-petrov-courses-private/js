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

const get = () => {
    return productCollection;
};

const findById = (id) => {

    const collection =  productCollection.find((element) => {
        return element.id == id;
    });

    return (collection) ? collection : [];
};

module.exports = {
    get, findById
};