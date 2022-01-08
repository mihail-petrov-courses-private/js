import { boardApi               } from "../../api/board.api.js";
import { cardApi                } from "../../api/card.api.js";
import { listApi                } from "../../api/list.api.js";
import { ToolbarBuilder         } from "./_toolbar.builder.js";
import { ContentBuilder         } from "./_content.builder.js";

export const fetchBoardToolbar = async (boardId) => {

    try {
        const boardResponse                 = await boardApi.getBoard(boardId);
        const $toolbarBuilderTemplate       = ToolbarBuilder.build(boardResponse.body[[0]]);
        return $toolbarBuilderTemplate;
    }
    catch(error) {
        console.log(error);
        return "";
    }
};


export const fetchBoardContent = async (boardId) => {

    try {
        const listHttpResponse          = await listApi.getAllLists(boardId);
        const cardHttpResponse          = await cardApi.getAllCards(boardId);
        
        const listCollection            = listHttpResponse.body;
        const cardCollection            = cardHttpResponse.body;
        const listCardCollection        = transformListAndCardCollection(listCollection, cardCollection);

        const $contentBuilderTemplate   = ContentBuilder.build(listCardCollection);
        return $contentBuilderTemplate;
    }
    catch(error) {
        return "";
    }
};


const transformListAndCardCollection = (listCollection, cardCollection) => {

    const copyListCollection = JSON.parse(JSON.stringify(listCollection));

    for(const listElement of copyListCollection) {

        const resultCollection = cardCollection.filter((cardElement) => {
            return cardElement.list_id == listElement.id;
        });

        listElement.cards = resultCollection;
    }

    return copyListCollection;
};
