import { domat                  } from "../../libs/domat.js";
import { template               } from "../../libs/api.js";
import { FormGroup              } from "../../libs/form.js";
import { ActiveRouter           } from "../../services/active-router.js";
import { boardApi               } from "../../api/board.api.js";
import { ToolbarBuilder         } from "./_toolbar.builder.js";
import { ContentBuilder         } from "./_content.builder.js";

let boardToolbar;
let boardContent;
let formReference;
let currentAddCardFormDomReference = null;

const bootstrap = async () => {

    formReference   = FormGroup("#form--add-list");
    boardToolbar    = domat("#board--toolbar");
    boardContent    = domat("#board-list-column--placeholder");

    boardContent.on('click', (e) => {
        processAddCard(e);
    });

    const $toolbarBuilderTemplate = await fetchBoardToolbar();
    boardToolbar.html($toolbarBuilderTemplate);

    const $contentBuilderTemplate = await fetchBoardContent();
    boardContent.html($contentBuilderTemplate);

    formReference.submitIfValid(async (requestObject) => {
        createNewBoardList(requestObject);
    });
};

const fetchBoardToolbar = async () => {

    try {
        const boardId                       = ActiveRouter.get().getParam("id");
        const boardResponse                 = await boardApi.getBoard(boardId);
        const $toolbarBuilderTemplate       = ToolbarBuilder.build(boardResponse.body[[0]]);
        return $toolbarBuilderTemplate;
    }
    catch(error) {
        console.log(error);
        return "";
    }
};

const fetchBoardContent = async () => {

    try {
        const boardId                   = ActiveRouter.get().getParam("id");
        const httpResponse              = await boardApi.getAllLists(boardId);
        const listCollection            = httpResponse.body;

        const $contentBuilderTemplate   = ContentBuilder.build(listCollection);
        return $contentBuilderTemplate;
    }
    catch(error) {
        return "";
    }
};

const createNewBoardList = async (requestObject) => {

    try {
        const boardId       = ActiveRouter.get().getParam("id");
        await boardApi.createNewList(boardId, requestObject);

        const $contentBuilderTemplate = await fetchBoardContent();
        boardContent.html($contentBuilderTemplate);
        formReference.reset();
    }
    catch(error) {
        console.log(error);
    }
};



const processAddCard = (e) => {

    const domElement = domat(e.target);
    if(!domElement.hasAttr('data-target')) {
        return;
    }

    if(currentAddCardFormDomReference) {

        currentAddCardFormDomReference.addClass('display-none');
        currentAddCardFormDomReference.offAll();
    }

    const targetId          = domElement.attr('data-listid');
    const formReferenceId   = `#form--add-card--${targetId}`;

    // Remove class
    currentAddCardFormDomReference = domat(formReferenceId);
    currentAddCardFormDomReference.removeClass('display-none');

    const addCardFormGroup = FormGroup(formReferenceId);
    addCardFormGroup.submit(async (requestObject) => {

        const boardId       = ActiveRouter.get().getParam("id");
        const httpResponse = await boardApi.createNewBoardCard(boardId, targetId, requestObject);
        console.log(httpResponse);
    });
}

export default async ($domReference) => {

    const templateHtml = await template(`template/board/board.template.html`);
    $domReference.html(templateHtml);

    await bootstrap();
};