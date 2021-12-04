import { get, post } from '../libs/api.js';
const ENDPOINT = 'http://localhost:8223/api/list';

export const listApi = {};

/**
 * @author Mihail Petrov
 * @param {*} $boardId 
 */
 listApi.getAllLists = (boardId) => {

    const queryBoardId = `boardid=${boardId}`;
    return get(`${ENDPOINT}?${queryBoardId}`);
}

/**
 * @author Mihail Petrov
 * @param {*} $boardId 
 */
listApi.createNewList = (boardId, $list) => {

    const queryBoardId = `boardid=${boardId}`;
    return post(`${ENDPOINT}?${queryBoardId}`, $list);
}

