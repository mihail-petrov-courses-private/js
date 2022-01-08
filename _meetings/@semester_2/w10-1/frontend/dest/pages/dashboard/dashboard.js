var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { domat } from "../../libs/domat.js";
import { template } from "../../libs/api.js";
import { WorkspaceApi } from "../../api/workspace.api.js";
import { BoardApi } from "../../api/board.api.js";
import { ActiveRouter } from "../../services/active-router.js";
import { CreateWorkspaceDialog } from "../../dialogs/create-workspace/create-workspace.js";
import { CreateBoardDialog } from "../../dialogs/create-board/create-board.js";
import { SidebarBuilder } from "./_sidebar.builder.js";
import { ContentBuilder } from "./_content.builder.js";
const TEMPLATE = `template/dashboard/dashboard.template.html`;
const bootstrap = () => __awaiter(void 0, void 0, void 0, function* () {
    // > Process API request
    yield fetchAllWorkspaces();
    yield fetchAllBoardsByWorkspace();
    // > Process events
    const actionAddNewWorkspace = domat("#action--add-new-workspace");
    const actionAddNewBoard = domat("#action--add-new-board");
    actionAddNewWorkspace.on('click', () => {
        (new CreateWorkspaceDialog()).init();
    });
    actionAddNewBoard.on('click', () => {
        (new CreateBoardDialog()).init(ActiveRouter.get().getParam('id'));
    });
});
const fetchAllWorkspaces = () => __awaiter(void 0, void 0, void 0, function* () {
    const worspacePlaceholder = domat("#app-sidebar--workspaces");
    const response = yield WorkspaceApi.getAllWorkflow();
    const collection = response.body;
    const template = SidebarBuilder.build(collection);
    worspacePlaceholder.html(template);
});
const fetchAllBoardsByWorkspace = () => __awaiter(void 0, void 0, void 0, function* () {
    const workspaceId = ActiveRouter.get().getParam('id');
    let collection = [];
    if (workspaceId) {
        const httpResponse = yield BoardApi.getAllBoards(workspaceId);
        collection = httpResponse.body;
    }
    const boardPlaceholder = domat("#app-content");
    const template = ContentBuilder.build(collection);
    boardPlaceholder.html(template);
});
export default ($domReference) => __awaiter(void 0, void 0, void 0, function* () {
    const templateHtml = yield template(TEMPLATE);
    $domReference.html(templateHtml);
    bootstrap();
});
