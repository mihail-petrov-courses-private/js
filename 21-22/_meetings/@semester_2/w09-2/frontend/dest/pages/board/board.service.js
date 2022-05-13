var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { BoardApi } from "../../api/board.api.js";
import { CardApi } from "../../api/card.api.js";
import { ListApi } from "../../api/list.api.js";
import { ToolbarBuilder } from "./_toolbar.builder.js";
import { ContentBuilder } from "./_content.builder.js";
export const fetchBoardToolbar = (boardId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const boardResponse = yield BoardApi.getBoard(boardId);
        const $toolbarBuilderTemplate = ToolbarBuilder.build(boardResponse.body[0]);
        return $toolbarBuilderTemplate;
    }
    catch (error) {
        console.log(error);
        return "";
    }
});
export const fetchBoardContent = (boardId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const listHttpResponse = yield ListApi.getAllLists(boardId);
        const cardHttpResponse = yield CardApi.getAllCards(boardId);
        const listCollection = listHttpResponse.body;
        const cardCollection = cardHttpResponse.body;
        const listCardCollection = transformListAndCardCollection(listCollection, cardCollection);
        const $contentBuilderTemplate = ContentBuilder.build(listCardCollection);
        return $contentBuilderTemplate;
    }
    catch (error) {
        return "";
    }
});
const transformListAndCardCollection = (listCollection, cardCollection) => {
    const copyListCollection = JSON.parse(JSON.stringify(listCollection));
    for (const listElement of copyListCollection) {
        const resultCollection = cardCollection.filter((cardElement) => {
            return cardElement.list_id == listElement.id;
        });
        listElement.cards = resultCollection;
    }
    return copyListCollection;
};
