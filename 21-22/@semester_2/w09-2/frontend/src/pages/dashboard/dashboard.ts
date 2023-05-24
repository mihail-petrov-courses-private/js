import { domat                  } from "../../libs/domat.js";
import { template               } from "../../libs/api.js";
import { WorkspaceApi           } from "../../api/workspace.api.js";
import { BoardApi               } from "../../api/board.api.js";
import { ActiveRouter           } from "../../services/active-router.js";
import { CreateWorkspaceDialog  } from "../../dialogs/create-workspace/create-workspace.js";
import { CreateBoardDialog      } from "../../dialogs/create-board/create-board.js";

import { SidebarBuilder         } from "./_sidebar.builder.js";
import { ContentBuilder         } from "./_content.builder.js";

const TEMPLATE = `template/dashboard/dashboard.template.html`;

const bootstrap = async () => {

    // > Process API request
    await fetchAllWorkspaces();
    await fetchAllBoardsByWorkspace();

    // > Process events
    const actionAddNewWorkspace   = domat("#action--add-new-workspace");
    const actionAddNewBoard       = domat("#action--add-new-board");

    actionAddNewWorkspace.on('click', () => {
        (new CreateWorkspaceDialog()).init();
    });

    actionAddNewBoard.on('click', () => {
        (new CreateBoardDialog()).init(ActiveRouter.get().getParam('id'));
    });
};

const fetchAllWorkspaces = async () => {

    const worspacePlaceholder   = domat("#app-sidebar--workspaces");
    const response              = await WorkspaceApi.getAllWorkflow();
    const collection            = response.body;
    const template              = SidebarBuilder.build(collection);
    worspacePlaceholder.html(template);
}

const fetchAllBoardsByWorkspace = async () => {

    const workspaceId = ActiveRouter.get().getParam('id');
    let collection    = [];

    if(workspaceId) {

        const httpResponse  = await BoardApi.getAllBoards(workspaceId);
        collection          = httpResponse.body;
    }
    
    const boardPlaceholder      = domat("#app-content") ;
    const template              = ContentBuilder.build(collection);
    boardPlaceholder.html(template);
}

export default async ($domReference) => {

    const templateHtml = await template(TEMPLATE);
    $domReference.html(templateHtml);

    bootstrap();
};