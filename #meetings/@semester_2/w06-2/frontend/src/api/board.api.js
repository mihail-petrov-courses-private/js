import { get, post } from '../libs/api.js';
const ENDPOINT = 'http://localhost:8223/api/board';

export const boardApi = {};

/**
 * @author Mihail Petrov
 * @returns 
 */
 boardApi.getAllBoards = (workspaceId) => {
    return get(`${ENDPOINT}?workspaceid=${workspaceId}`);
}

/**
 * @author Mihail Petrov
 * @returns 
 */
 boardApi.createNewBoard = ($board) => {
    return post(`${ENDPOINT}/`, $board);
}