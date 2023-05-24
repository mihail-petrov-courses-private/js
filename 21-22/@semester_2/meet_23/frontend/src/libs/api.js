import templateChache from '../services/template-cache.service.js';
import { AuthManager } from '../services/auth-manager.js';

/**
 * @author Mihail Petrov
 * @param {*} url 
 * @returns 
 */
export const template = async (url) => {
    
    if(templateChache.has(url)) {
        return templateChache.get(url);
    }
    
    const templateHtml = await templateProvider(url);
    templateChache.set(url, templateHtml);
    return templateHtml;
}

/**
 * @author Mihail Petrov
 * @param {*} url 
 * @returns 
 */
export const templateProvider = (url) => {
    return fetch(url).then(response => response.text());
}

/**
 * @author Mihail Petrov
 * @param {*} endpoint 
 * @returns 
 */
export const get = async (endpoint) => {

    // Async - Await
    const httpRequestConfig = {
        method  : 'GET',
        headers : getHttpHeaders(),
    };

    const dataResponse      = await fetch(endpoint, httpRequestConfig);
    const status            = dataResponse.status; 
    const isSuccess         = status >= 200 && status < 300;

    const data              = await dataResponse.json();
    const responseObj       = ({ status, body: data});
    if(isSuccess) {
        return responseObj
    }

    throw responseObj;
};

/**
 * @author Mihail Petrov
 * @param {*} endpoint 
 * @param {*} $body 
 * @returns 
 */
export const post = async (endpoint, $body) => {
    
    const httpRequestConfig = {
        method  : 'POST',
        headers : getHttpHeaders(),
        body    : JSON.stringify($body),
    };

    const dataResponse  = await fetch(endpoint, httpRequestConfig);
    const status        = dataResponse.status; 
    const isSuccess     = status >= 200 && status < 300;

    const data          = await dataResponse.json();
    const responseObj   = ({ status, body: data});
    if(isSuccess) {
        return responseObj
    }

    throw responseObj;
};

const getHttpHeaders = () => {

    const contentTypeHeader = {
        'Content-Type': 'application/json'
    };

    const authHeader = (AuthManager.isAuthenticated()) ? {
            'Authentication' : AuthManager.getToken() 
    } : {};

    return {
        ...contentTypeHeader, ...authHeader
    };
};