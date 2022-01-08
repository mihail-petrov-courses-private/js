import { apiEndpoint    } from '../config/endpoint.js';
import { get, post      } from '../libs/api.js';
import { CommentType    } from '../types/comment.type.js';

export class CommentApi {

    /**
     * @author Mihail Petrov
     * @param {*} boardId 
     * @param {*} listId 
     */
    public static getAllComments(cardId: number) {

        return get(apiEndpoint("comment", "/", {
            'cardid': cardId
        }));
    };

    /**
     * @author Mihail Petrov
     * @param {*} $boardId 
     */
    public static createComment($comment: CommentType) {
        return post(apiEndpoint("comment", "/"), $comment);
    }
}

