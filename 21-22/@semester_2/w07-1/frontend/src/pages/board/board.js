import { domat                  } from "../../libs/domat.js";
import { template               } from "../../libs/api.js";
import { ActiveRouter           } from "../../services/active-router.js";
import { boardApi               } from "../../api/board.api.js";
import { ToolbarBuilder         } from "./_toolbar.builder.js";

const bootstrap = async () => {

    const boardToolbar = domat("#board--toolbar");

    const $toolbarBuilderTemplate = await fetchBoardToolbar();
    boardToolbar.html($toolbarBuilderTemplate);
};

const fetchBoardToolbar = async () => {

    const boardId                       = ActiveRouter.get().getParam("id");
    const boardResponse                 = await boardApi.getBoard(boardId);
    const $toolbarBuilderTemplate       = ToolbarBuilder.build(boardResponse.body[[0]]);
    return $toolbarBuilderTemplate;
};

export default async ($domReference) => {

    const templateHtml = await template(`template/board/board.template.html`);
    $domReference.html(templateHtml);

    await bootstrap();
};