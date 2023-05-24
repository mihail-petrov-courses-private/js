import { domat      } from '../../libs/domat.js';
import { BaseDialog } from '../base-dialog/base-dialog.js';
import { cardApi    } from '../../api/card.api.js';
import { commentApi } from '../../api/comment.api.js';
import { FormGroup  } from '../../libs/form.js';


export class CardDialog extends BaseDialog {

    boardId = null;
    cardId  = null;
    _commentCollection = [];

    $activityPlaceholder = null;

    async init(boardId, cardId) {

        this.boardId    = boardId; 
        this.cardId     = cardId;
        await this.bootstrap(`dialogs/card-dialog/card-dialog.template.html`);

        const titlePlaceholder      = domat("#card-dialog--title");
        const overviewPlaceholder   = domat("#card-dialog--overview");
        this.$activityPlaceholder   = domat("#card-dialog--activity");

        const httpResponse          = await cardApi.getCard(this.boardId, this.cardId);
        const {title, overview}     = httpResponse.body[0];
    
        titlePlaceholder.html(title);
        overviewPlaceholder.html(overview);

        const $template = await this.fetchAllComments();
        this.$activityPlaceholder.html($template);

        // init form
        this.bootstrapForm();
    }

    async fetchAllComments() {

        const httpResponse      = await commentApi.getAllComments(this.cardId);
        this._commentCollection = httpResponse.body;

        return this.buildCommentTemplate(this._commentCollection);
    }

    buildCommentTemplate(commentCollection) {
        
        const $templateCollection = commentCollection.map(comment => {
            return `<div class="comment">${comment.content}</div>`;
        });

        return $templateCollection.join('');
    }

    bootstrapForm() {

        this.form          = FormGroup("#form--card-comment");

        this.form.submitIfValid(async (collection) => {
            await this.onFormSubmit(collection);
        });
    }

    async onFormSubmit(collection) {

        try {
            const requestObject = {
                ...collection, 
                cardId  : this.cardId,
                boardId : this.boardId 
            };

            const response      = await commentApi.createComment(this.cardId, requestObject);
            const cardElement   = response.body.data;
            this._commentCollection.push(cardElement);
            const $template = this.buildCommentTemplate(this._commentCollection);
            this.$activityPlaceholder.html($template);
            this.form.reset();
        }
        catch(error) {
            console.log(error);
            const errorMessage = error.body.message;
            console.log(errorMessage);
        }
    }
}