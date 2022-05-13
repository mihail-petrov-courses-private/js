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
import { WorkspaceApi } from "../../api/workspace.api.js";
import { domat } from '../../libs/domat.js';
import { ActiveRouter } from '../../services/active-router.js';
export class CreateWorkspaceDialog extends BaseDialog {
    constructor() {
        super(...arguments);
        this.placeholder = null;
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.bootstrap(`dialogs/create-workspace/create-workspace.template.html`);
            this.bootstrapForm();
        });
    }
    bootstrapForm() {
        this.form = FormGroup("#form--create-workspace");
        this.placeholder = domat("#error-message");
        this.placeholder.css({ 'display': 'none' });
        this.form.submitIfValid((collection) => __awaiter(this, void 0, void 0, function* () {
            this.onFormSubmit(collection);
        }));
    }
    onFormSubmit(collection) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield WorkspaceApi.createNewWorkflow(collection);
                const workspace = response.body.data;
                ActiveRouter.get().redirect(`workspace/${workspace.id}`);
                this.close();
            }
            catch (error) {
                console.log(error);
                const errorMessage = error.body.message;
                this.placeholder.html(errorMessage);
                this.placeholder.css({ 'display': 'block' });
            }
        });
    }
}
