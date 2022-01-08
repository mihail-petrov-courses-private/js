var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { domat } from '../../libs/domat.js';
import { BaseDialog } from '../base-dialog/base-dialog.js';
import { CardApi } from '../../api/card.api.js';
import { CommentApi } from '../../api/comment.api.js';
import { FormGroup } from '../../libs/form.js';
export class CardDialog extends BaseDialog {
    constructor() {
        super(...arguments);
        this.boardId = null;
        this.cardId = null;
        this._commentCollection = [];
        this.$activityPlaceholder = null;
    }
    init(externalProperty) {
        return __awaiter(this, void 0, void 0, function* () {
            this.boardId = externalProperty.boardId;
            this.cardId = externalProperty.cardId;
            yield this.bootstrap(`dialogs/card-dialog/card-dialog.template.html`);
            const titlePlaceholder = domat("#card-dialog--title");
            const overviewPlaceholder = domat("#card-dialog--overview");
            this.$activityPlaceholder = domat("#card-dialog--activity");
            const httpResponse = yield CardApi.getCard(this.boardId, this.cardId);
            const { title, overview } = httpResponse.body[0];
            titlePlaceholder.html(title);
            overviewPlaceholder.html(overview);
            const $template = yield this.fetchAllComments();
            this.$activityPlaceholder.html($template);
            // init form
            this.bootstrapForm();
        });
    }
    fetchAllComments() {
        return __awaiter(this, void 0, void 0, function* () {
            const httpResponse = yield CommentApi.getAllComments(this.cardId);
            this._commentCollection = httpResponse.body;
            return this.buildCommentTemplate(this._commentCollection);
        });
    }
    buildCommentTemplate(commentCollection) {
        const $templateCollection = commentCollection.map(comment => {
            return `<div class="comment">${comment.content}</div>`;
        });
        return $templateCollection.join('');
    }
    bootstrapForm() {
        this.form = FormGroup("#form--card-comment");
        this.form.submitIfValid((collection) => __awaiter(this, void 0, void 0, function* () {
            yield this.onFormSubmit(collection);
        }));
    }
    onFormSubmit(collection) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const requestObject = Object.assign(Object.assign({}, collection), { cardId: this.cardId, boardId: this.boardId });
                const response = yield CommentApi.createComment(requestObject);
                const cardElement = response.body.data;
                this._commentCollection.push(cardElement);
                const $template = this.buildCommentTemplate(this._commentCollection);
                this.$activityPlaceholder.html($template);
                this.form.reset();
            }
            catch (error) {
                console.log(error);
                const errorMessage = error.body.message;
                console.log(errorMessage);
            }
        });
    }
}
