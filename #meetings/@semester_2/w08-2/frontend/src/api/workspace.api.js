import { get, post } from '../libs/api.js';
const ENDPOINT = 'http://localhost:8223/api/workspace';

export const workspaceApi = {};

/**
 * @author Mihail Petrov
 * @returns 
 */
 workspaceApi.getAllWorkflow = () => {
    return get(`${ENDPOINT}/`);
}

/**
 * @author Mihail Petrov
 * @returns 
 */
 workspaceApi.createNewWorkflow = ($workspace) => {
    return post(`${ENDPOINT}/`, $workspace);
}