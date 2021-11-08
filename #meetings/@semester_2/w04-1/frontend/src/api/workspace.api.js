import { get, post } from '../libs/api.js';
const ENDPOINT = 'http://localhost:8223/api/workspace';

/**
 * @author Mihail Petrov
 * @returns 
 */
export const getAllWorkflow = () => {
    return get(`${ENDPOINT}/`);
}

/**
 * @author Mihail Petrov
 * @returns 
 */
export const createNewWorkflow = ($workspace) => {
    return post(`${ENDPOINT}/`, $workspace);
}