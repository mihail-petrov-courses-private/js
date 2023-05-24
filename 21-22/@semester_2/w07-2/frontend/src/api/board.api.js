import { get, post } from '../libs/api.js';
import board from '../pages/board/board.js';
const ENDPOINT = 'http://localhost:8223/api/board';

export const boardApi = {};

/**
 * @author Mihail Petrov
 * @returns 
 */
 boardApi.getAllBoards = (workspaceId) => {
    return get(`${ENDPOINT}?workspaceid=${workspaceId}`);
};

/**
 * @author Mihail Petrov
 * @param {*} boardId 
 * @returns 
 */
boardApi.getBoard = (boardId) => {
    return get(`${ENDPOINT}/${boardId}`);
}

/**
 * @author Mihail Petrov
 * @returns 
 */
 boardApi.createNewBoard = ($board) => {
    return post(`${ENDPOINT}/`, $board);
};

/**
 * @author Mihail Petrov
 * @param {*} $boardId 
 */
 boardApi.getAllLists = (boardId) => {
    return get(`${ENDPOINT}/${boardId}/list`);
}


/**
 * @author Mihail Petrov
 * @param {*} $boardId 
 */
boardApi.createNewList = (boardId, $list) => {
    return post(`${ENDPOINT}/${boardId}/list`, $list);
}

/**
 * @author Mihail Petrov
 * @param {*} $boardId 
 */
 boardApi.createNewBoardCard = (boardId, listId, $list) => {
    return post(`${ENDPOINT}/${boardId}/list/${listId}/card`, $list);
}

