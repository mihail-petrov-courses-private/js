var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import templateChache from '../services/template-cache.service.js';
import { AuthManager } from '../services/auth-manager.js';
/**
 * @author Mihail Petrov
 * @param {*} url
 * @returns
 */
export const template = (url) => __awaiter(void 0, void 0, void 0, function* () {
    if (templateChache.has(url)) {
        return templateChache.get(url);
    }
    const templateHtml = yield templateProvider(url);
    templateChache.set(url, templateHtml);
    return templateHtml;
});
/**
 * @author Mihail Petrov
 * @param {*} url
 * @returns
 */
export const templateProvider = (url) => {
    return fetch(url).then(response => response.text());
};
/**
 * @author Mihail Petrov
 * @param {*} endpoint
 * @returns
 */
export const get = (endpoint) => __awaiter(void 0, void 0, void 0, function* () {
    // Async - Await
    const httpRequestConfig = {
        method: 'GET',
        headers: getHttpHeaders(),
    };
    const dataResponse = yield fetch(endpoint, httpRequestConfig);
    const status = dataResponse.status;
    const isSuccess = status >= 200 && status < 300;
    const data = yield dataResponse.json();
    const responseObj = ({ status, body: data });
    if (isSuccess) {
        return responseObj;
    }
    throw responseObj;
});
/**
 * @author Mihail Petrov
 * @param {*} endpoint
 * @param {*} $body
 * @returns
 */
export const post = (endpoint, $body) => __awaiter(void 0, void 0, void 0, function* () {
    const httpRequestConfig = {
        method: 'POST',
        headers: getHttpHeaders(),
        body: JSON.stringify($body),
    };
    const dataResponse = yield fetch(endpoint, httpRequestConfig);
    const status = dataResponse.status;
    const isSuccess = status >= 200 && status < 300;
    const data = yield dataResponse.json();
    const responseObj = ({ status, body: data });
    if (isSuccess) {
        return responseObj;
    }
    throw responseObj;
});
const getHttpHeaders = () => {
    const contentTypeHeader = {
        'Content-Type': 'application/json'
    };
    const authHeader = (AuthManager.isAuthenticated()) ? {
        'Authentication': AuthManager.getToken()
    } : {};
    return Object.assign(Object.assign({}, contentTypeHeader), authHeader);
};
