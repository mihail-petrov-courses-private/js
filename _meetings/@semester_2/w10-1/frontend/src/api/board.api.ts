import { apiEndpoint    } from '../config/endpoint';
import { get, post      } from '../libs/api.js';
import { BoardType      } from '../types/board.type.js';

export class BoardApi {

    public static getAllBoards(workspaceId: number) {

        return get(apiEndpoint("board", "/", {
            "workspaceid" : workspaceId
        }));
    } 

    public static getBoard(boardId: number) {
        return get(apiEndpoint("board", `/${boardId}`));
    }

    public static createNewBoard($board: BoardType) {
        return post(apiEndpoint("board", "/"), $board);
    }
}