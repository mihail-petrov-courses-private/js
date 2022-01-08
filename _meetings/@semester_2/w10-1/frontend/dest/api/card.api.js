import { apiEndpoint } from '../config/endpoint.js';
import { get, post } from '../libs/api.js';
export class CardApi {
    /**
     * @author Mihail Petrov
     * @param {*} boardId
     * @param {*} listId
     */
    static getAllCards(boardId) {
        return get(apiEndpoint('card', '/', {
            'boardid': boardId
        }));
    }
    ;
    /**
     * @author Mihail Petrov
     * @param {*} boardId
     * @param {*} cardId
     */
    static getCard(boardId, cardId) {
        return get(apiEndpoint('card', `/${cardId}`, {
            'boardid': boardId
        }));
    }
    ;
    /**
     * @author Mihail Petrov
     * @param {*} $boardId
     */
    static createCard($card) {
        return post(apiEndpoint('card', '/'), $card);
    }
}
