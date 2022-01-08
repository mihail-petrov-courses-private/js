const cacheCollection = {};

const has = (key) => {
    return key in cacheCollection;
};

const get = (key) => {
    return cacheCollection[key];
};

const set = (key, template) => {
    cacheCollection[key] = template;
};

export default {
    has, get, set
};