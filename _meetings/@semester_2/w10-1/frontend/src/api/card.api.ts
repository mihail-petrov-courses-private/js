import { apiEndpoint    } from '../config/endpoint.js';
import { get, post      } from '../libs/api.js';
import { CardType       } from '../types/card.type.js';

export class CardApi {

    /**
     * @author Mihail Petrov
     * @param {*} boardId 
     * @param {*} listId 
     */
    public static getAllCards(boardId: number) {

        return get(apiEndpoint('card', '/', {
            'boardid': boardId
        }));
    };

    /**
     * @author Mihail Petrov
     * @param {*} boardId 
     * @param {*} cardId 
     */
    public static getCard(boardId: number, cardId: number) {

        return get(apiEndpoint('card', `/${cardId}`, {
            'boardid': boardId
        }));
    };

    /**
     * @author Mihail Petrov
     * @param {*} $boardId 
     */
    public static createCard($card: CardType) {
        return post(apiEndpoint('card', '/'), $card);
    }
}