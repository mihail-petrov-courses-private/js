import { domat      } from '../../libs/domat.js';
import { BaseDialog } from '../base-dialog/base-dialog.js';
import { CardApi    } from '../../api/card.api.js';
import { CommentApi } from '../../api/comment.api.js';
import { FormGroup, FormGroupReference  } from '../../libs/form.js';

export class CardDialog extends BaseDialog {

    private boardId = null;
    private cardId  = null;
    private _commentCollection = [];
    private $activityPlaceholder = null;

    private form: FormGroupReference;

    public async init(externalProperty) {

        this.boardId    = externalProperty.boardId; 
        this.cardId     = externalProperty.cardId;
        await this.bootstrap(`dialogs/card-dialog/card-dialog.template.html`);

        const titlePlaceholder      = domat("#card-dialog--title");
        const overviewPlaceholder   = domat("#card-dialog--overview");
        this.$activityPlaceholder   = domat("#card-dialog--activity");

        const httpResponse          = await CardApi.getCard(this.boardId, this.cardId);
        const {title, overview}     = httpResponse.body[0];
    
        titlePlaceholder.html(title);
        overviewPlaceholder.html(overview);

        const $template = await this.fetchAllComments();
        this.$activityPlaceholder.html($template);

        // init form
        this.bootstrapForm();
    }

    public async fetchAllComments() {

        const httpResponse      = await CommentApi.getAllComments(this.cardId);
        this._commentCollection = httpResponse.body;

        return this.buildCommentTemplate(this._commentCollection);
    }

    public buildCommentTemplate(commentCollection) {
        
        const $templateCollection = commentCollection.map(comment => {
            return `<div class="comment">${comment.content}</div>`;
        });

        return $templateCollection.join('');
    }

    public bootstrapForm() {

        this.form = FormGroup("#form--card-comment");

        this.form.submitIfValid(async (collection) => {
            await this.onFormSubmit(collection);
        });
    }

    public async onFormSubmit(collection) {

        try {
            const requestObject = {
                ...collection, 
                cardId  : this.cardId,
                boardId : this.boardId 
            };

            const response      = await CommentApi.createComment(requestObject);
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