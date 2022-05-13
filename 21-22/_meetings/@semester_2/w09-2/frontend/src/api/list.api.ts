import { apiEndpoint    } from '../config/endpoint.js';
import { get, post      } from '../libs/api.js';
import { ListType       } from '../types/list.type.js';

export class ListApi {

    /**
     * @author Mihail Petrov
     * @param {*} $boardId 
     */
    public static getAllLists(boardId) {

        return get(apiEndpoint("list", "/", {
            "boardid": boardId
        }));
    }

    /**
     * @author Mihail Petrov
     * @param {*} $boardId 
     */
    public static createNewList($list: ListType) {
        return post(apiEndpoint("list", "/"), $list);
    }
};