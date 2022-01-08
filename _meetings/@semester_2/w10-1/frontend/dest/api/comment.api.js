import { apiEndpoint } from '../config/endpoint.js';
import { get, post } from '../libs/api.js';
export class CommentApi {
    /**
     * @author Mihail Petrov
     * @param {*} boardId
     * @param {*} listId
     */
    static getAllComments(cardId) {
        return get(apiEndpoint("comment", "/", {
            'cardid': cardId
        }));
    }
    ;
    /**
     * @author Mihail Petrov
     * @param {*} $boardId
     */
    static createComment($comment) {
        return post(apiEndpoint("comment", "/"), $comment);
    }
}
