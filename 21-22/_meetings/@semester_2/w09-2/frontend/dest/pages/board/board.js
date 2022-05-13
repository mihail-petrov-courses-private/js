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
import { FormGroup } from "../../libs/form.js";
import { ActiveRouter } from "../../services/active-router.js";
import { CardApi } from "../../api/card.api.js";
import { ListApi } from "../../api/list.api.js";
import { fetchBoardToolbar, fetchBoardContent } from './board.service.js';
import { CardDialog } from '../../dialogs/card-dialog/card-dialog.js';
let boardToolbar;
let boardContent;
let formReference;
let currentAddCardFormDomReference = null;
const bootstrap = () => __awaiter(void 0, void 0, void 0, function* () {
    formReference = FormGroup("#form--add-list");
    boardToolbar = domat("#board--toolbar");
    boardContent = domat("#board-list-column--placeholder");
    boardContent.on('click', (e) => __awaiter(void 0, void 0, void 0, function* () {
        yield processCard(e);
    }));
    const boardId = ActiveRouter.get().getParam("id");
    const $toolbarBuilderTemplate = yield fetchBoardToolbar(boardId);
    boardToolbar.html($toolbarBuilderTemplate);
    const $contentBuilderTemplate = yield fetchBoardContent(boardId);
    boardContent.html($contentBuilderTemplate);
    formReference.submitIfValid((requestObject) => __awaiter(void 0, void 0, void 0, function* () {
        createNewBoardList(requestObject);
    }));
});
const createNewBoardList = (requestObject) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const boardId = ActiveRouter.get().getParam("id");
        yield ListApi.createNewList(requestObject);
        const $contentBuilderTemplate = yield fetchBoardContent(boardId);
        boardContent.html($contentBuilderTemplate);
        formReference.reset();
    }
    catch (error) {
        console.log(error);
    }
});
const processCard = (e) => __awaiter(void 0, void 0, void 0, function* () {
    const domElement = domat(e.target);
    if (!domElement.hasAttr('data-target')) {
        return;
    }
    if (domElement.attr('data-target') == "card") {
        yield processViewCard(domElement);
    }
    if (domElement.attr('data-target') == "action") {
        processAddCard(domElement);
    }
});
const processViewCard = (domElement) => __awaiter(void 0, void 0, void 0, function* () {
    const boardId = ActiveRouter.get().getParam("id");
    const cardId = domElement.attr('data-cardid');
    yield (new CardDialog).init({ boardId, cardId });
});
const processAddCard = (domElement) => {
    if (currentAddCardFormDomReference) {
        currentAddCardFormDomReference.addClass('display-none');
        currentAddCardFormDomReference.offAll();
    }
    const listId = domElement.attr('data-listid');
    const formReferenceId = `#form--add-card--${listId}`;
    // Remove class
    currentAddCardFormDomReference = domat(formReferenceId);
    currentAddCardFormDomReference.removeClass('display-none');
    const addCardFormGroup = FormGroup(formReferenceId);
    addCardFormGroup.submit((requestObject) => __awaiter(void 0, void 0, void 0, function* () {
        yield createCard(listId, requestObject);
    }));
};
const createCard = (listId, requestObject) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const boardId = ActiveRouter.get().getParam("id");
        yield CardApi.createCard(requestObject);
        // refresh board content
        const $contentBuilderTemplate = yield fetchBoardContent(boardId);
        boardContent.html($contentBuilderTemplate);
    }
    catch (error) {
        console.log(error);
    }
});
export default ($domReference) => __awaiter(void 0, void 0, void 0, function* () {
    const templateHtml = yield template(`template/board/board.template.html`);
    $domReference.html(templateHtml);
    yield bootstrap();
});
