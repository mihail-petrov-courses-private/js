const map = (collection, callback) => {

    const newCollection = [];
    for(let i = 0; i < collection.length; i++) {
        newCollection.push(callback(collection[i]));
    }

    return newCollection;
};

let allItemCollection = [
    "BMW", "VW", "Lada", "Ford"
];

let restrictedItemCollection = [
    "Lada"
];

const reference = {};
reference.isRestricted = (element) => {

    for(let item of restrictedItemCollection) {
        if(element == item) return true;
    }

    return false;
}

const getAvailableItemCollection = () => {


    return map(allItemCollection, item => {

        let isRestricted = reference.isRestricted(item);
        return { item, isRestricted };
    });
};


availableItemListCollection = getAvailableItemCollection();
console.log(availableItemListCollection);