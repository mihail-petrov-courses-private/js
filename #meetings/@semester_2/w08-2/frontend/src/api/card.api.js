import { get, post } from '../libs/api.js';
const ENDPOINT = 'http://localhost:8223/api/card';

export const cardApi = {};

/**
 * @author Mihail Petrov
 * @param {*} boardId 
 * @param {*} listId 
 */
cardApi.getAllCards = (boardId) => {

    const queryBoardId = `boardid=${boardId}`;
    return get(`${ENDPOINT}?${queryBoardId}`);
};

/**
 * @author Mihail Petrov
 * @param {*} boardId 
 * @param {*} cardId 
 */
cardApi.getCard = (boardId, cardId) => {

    const queryBoardId = `boardid=${boardId}`;
    return get(`${ENDPOINT}/${cardId}?${queryBoardId}`);
};

/**
 * @author Mihail Petrov
 * @param {*} $boardId 
 */
 cardApi.createCard = (boardId, listId, $list) => {

    const queryListId   = `listid=${listId}`;
    const queryBoardId  = `boardid=${boardId}`;
    return post(`${ENDPOINT}?${queryListId}&${queryBoardId}`, $list);
}