export const get = (endpoint) => {

    return fetch(endpoint)
    .then(collection => collection.json());
};

export const post = (endpoint, $body) => {
    
    const httpRequestConfig = {
        method  : 'POST',
        headers : { 'Content-Type': 'application/json' },
        body    : JSON.stringify($body)
    };

    return fetch(endpoint, httpRequestConfig)
    .then(collection => collection.json())
};