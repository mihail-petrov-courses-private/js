import { apiEndpoint } from '../config/endpoint';
import { get, post } from '../libs/api.js';
export class BoardApi {
    static getAllBoards(workspaceId) {
        return get(apiEndpoint("board", "/", {
            "workspaceid": workspaceId
        }));
    }
    static getBoard(boardId) {
        return get(apiEndpoint("board", `/${boardId}`));
    }
    static createNewBoard($board) {
        return post(apiEndpoint("board", "/"), $board);
    }
}
