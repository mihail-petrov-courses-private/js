import { post } from '../libs/api.js';
const ENDPOINT = 'http://localhost:8223/api/auth/';
/**
 * @author Mihail Petrov
 * @param {*} $model
 * @returns
 */
export const signUp = ($model) => {
    return post(`${ENDPOINT}signup`, $model);
};
/**
 * @author Mihail Petrov
 * @param {*} $model
 * @returns
 */
export const signIn = ($model) => {
    return post(`${ENDPOINT}signin`, $model);
};
