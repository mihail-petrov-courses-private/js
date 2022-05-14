// 
const filterEvenNumbers = (collection) => {

    let newCollection = [];
    for(let element of collection) {
        if(element % 2 == 0) {  // RULE
            newCollection.push(element);
        }
    }

    return newCollection;
};


const filterProductBy3 = (collection) => {
    
    let newCollection = [];
    for(let element of collection) {
        if(element % 3 == 0) {  // RULE
            newCollection.push(element);
        }
    }

    return newCollection;
};


const findGreaterThan5 = (collection) => {
    
        // съкратен for
        let newCollection = [];
        for(let element of collection) {
            if(element > 5) {  // RULE
                newCollection.push(element);
            }
        }
    
        return newCollection;
};


const isEven            = (element) => element % 2 == 0;
const isFactorOf3       = (element) => element % 3 == 0;
const isGratherThan5    = (element) => element > 5;

const filter =  (collection, dynamicFunctionName) => {
 
    let newCollection = [];
    for(let element of collection) {
        if(dynamicFunctionName(element)) {
            newCollection.push(element);
        }
    }

    return newCollection;
};

const exampleCollection = [1,2,3,4,5,6,7,8,9,10,11,12];
console.log(filterEvenNumbers(exampleCollection));
console.log(filter(exampleCollection, isEven));
console.log(filter(exampleCollection, (collectionElement) => {
    return collectionElement % 2 == 0;
}));
console.log("**");

// console.log(filter(exampleCollection));

console.log(filterProductBy3(exampleCollection));
console.log(filter(exampleCollection, isFactorOf3));
console.log(filter(exampleCollection, (element) => {
    return element % 3 == 0;
}));
console.log(findGreaterThan5(exampleCollection));
console.log(filter(exampleCollection, isGratherThan5));
console.log(filter(exampleCollection, (element) => {
    return element > 5;
}));