import templateChache from '../services/template-cache.service.js';

export const template = async (url) => {
    
    if(templateChache.has(url)) {
        return templateChache.get(url);
    }
    
    const templateHtml = await templateProvider(url);
    templateChache.set(url, templateHtml);
    return templateHtml;
}

export const templateProvider = (url) => {
    return fetch(url).then(response => response.text());
}

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