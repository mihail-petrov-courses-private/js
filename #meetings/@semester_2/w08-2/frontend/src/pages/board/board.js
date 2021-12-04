import { domat                  } from "../../libs/domat.js";
import { template               } from "../../libs/api.js";
import { FormGroup              } from "../../libs/form.js";
import { ActiveRouter           } from "../../services/active-router.js";
import { cardApi                } from "../../api/card.api.js";
import { listApi                } from "../../api/list.api.js";
import { fetchBoardToolbar      , 
         fetchBoardContent      } from './board.service.js';

import { CardDialog             } from '../../dialogs/card-dialog/crad-dialog.js';

let boardToolbar;
let boardContent;
let formReference;
let currentAddCardFormDomReference = null;

const bootstrap = async () => {

    formReference   = FormGroup("#form--add-list");
    boardToolbar    = domat("#board--toolbar");
    boardContent    = domat("#board-list-column--placeholder");

    boardContent.on('click', async (e) => {
        await processCard(e);
    });

    const boardId       = ActiveRouter.get().getParam("id");
    const $toolbarBuilderTemplate = await fetchBoardToolbar(boardId);
    boardToolbar.html($toolbarBuilderTemplate);

    const $contentBuilderTemplate = await fetchBoardContent(boardId);
    boardContent.html($contentBuilderTemplate);

    formReference.submitIfValid(async (requestObject) => {
        createNewBoardList(requestObject);
    });
};

const createNewBoardList = async (requestObject) => {

    try {
        const boardId       = ActiveRouter.get().getParam("id");
        await listApi.createNewList(boardId, requestObject);

        const $contentBuilderTemplate = await fetchBoardContent(boardId);
        boardContent.html($contentBuilderTemplate);
        formReference.reset();
    }
    catch(error) {
        console.log(error);
    }
};

const processCard = async (e) => {

    const domElement = domat(e.target);
    if(!domElement.hasAttr('data-target')) {
        return;
    }

    if(domElement.attr('data-target') == "card") {
        await processViewCard(domElement);
    }

    if(domElement.attr('data-target') == "action") {
        processAddCard(domElement);
    }
};

const processViewCard = async (domElement) => {

    const boardId       = ActiveRouter.get().getParam("id");
    const cardId        = domElement.attr('data-cardid');
    await (new CardDialog).init(boardId, cardId);
}

const processAddCard = (domElement) => {

    if(currentAddCardFormDomReference) {

        currentAddCardFormDomReference.addClass('display-none');
        currentAddCardFormDomReference.offAll();
    }

    const listId          = domElement.attr('data-listid');
    const formReferenceId   = `#form--add-card--${listId}`;

    // Remove class
    currentAddCardFormDomReference = domat(formReferenceId);
    currentAddCardFormDomReference.removeClass('display-none');

    const addCardFormGroup = FormGroup(formReferenceId);
    addCardFormGroup.submit(async (requestObject) => {
        await createCard(listId, requestObject);
    });
}

const createCard = async (listId, requestObject) => {
    
    try {
        const boardId       = ActiveRouter.get().getParam("id");
        await cardApi.createCard(boardId, listId, requestObject);
        
        // refresh board content
        const $contentBuilderTemplate = await fetchBoardContent(boardId);
        boardContent.html($contentBuilderTemplate);
    }
    catch(error) {
        console.log(error);
    }
}

export default async ($domReference) => {

    const templateHtml = await template(`template/board/board.template.html`);
    $domReference.html(templateHtml);

    await bootstrap();
};