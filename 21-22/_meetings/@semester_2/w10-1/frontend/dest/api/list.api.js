import { apiEndpoint } from '../config/endpoint.js';
import { get, post } from '../libs/api.js';
export class ListApi {
    /**
     * @author Mihail Petrov
     * @param {*} $boardId
     */
    static getAllLists(boardId) {
        return get(apiEndpoint("list", "/", {
            "boardid": boardId
        }));
    }
    /**
     * @author Mihail Petrov
     * @param {*} $boardId
     */
    static createNewList($list) {
        return post(apiEndpoint("list", "/"), $list);
    }
}
;
