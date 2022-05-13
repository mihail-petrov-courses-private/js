import { get, post } from '../libs/api.js';
const ENDPOINT = 'http://localhost:8223/api/comment';

export const commentApi = {};

/**
 * @author Mihail Petrov
 * @param {*} boardId 
 * @param {*} listId 
 */
commentApi.getAllComments = (cardId) => {

    const queryCardId = `cardid=${cardId}`;
    return get(`${ENDPOINT}?${queryCardId}`);
};

/**
 * @author Mihail Petrov
 * @param {*} $boardId 
 */
 commentApi.createComment = (cardId, $list) => {

    const queryCardId = `cardid=${cardId}`;
    return post(`${ENDPOINT}?${queryCardId}`, $list);
}