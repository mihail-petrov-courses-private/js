var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { BaseDialog } from '../base-dialog/base-dialog.js';
import { FormGroup } from '../../libs/form.js';
import { domat } from '../../libs/domat.js';
import { BoardApi } from "../../api/board.api.js";
import { ActiveRouter } from '../../services/active-router.js';
export class CreateBoardDialog extends BaseDialog {
    constructor() {
        super(...arguments);
        this.workspaceId = null;
        this.placeholder = null;
    }
    init(workspaceId) {
        return __awaiter(this, void 0, void 0, function* () {
            this.workspaceId = workspaceId;
            yield this.bootstrap(`dialogs/create-board/create-board.template.html`);
            this.bootstrapForm();
        });
    }
    bootstrapForm() {
        this.form = FormGroup("#form--create-board");
        this.placeholder = domat("#error-message");
        this.placeholder.css({ 'display': 'none' });
        this.form.submitIfValid((collection) => __awaiter(this, void 0, void 0, function* () {
            this.onFormSubmit(collection);
        }));
    }
    onFormSubmit(collection) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const requestObject = Object.assign(Object.assign({}, collection), { workspaceId: this.workspaceId });
                const response = yield BoardApi.createNewBoard(requestObject);
                const entity = response.body.data;
                ActiveRouter.get().redirect(`board/${entity.id}`);
                this.close();
            }
            catch (error) {
                const errorMessage = error.body.message;
                this.placeholder.html(errorMessage);
                this.placeholder.css({ 'display': 'block' });
            }
        });
    }
}
