import { BaseDialog     } from '../base-dialog/base-dialog.js';
import { FormGroup, FormGroupReference      } from '../../libs/form.js';
import { WorkspaceApi   } from "../../api/workspace.api.js";
import { domat          } from '../../libs/domat.js';
import { ActiveRouter   } from '../../services/active-router.js';

export class CreateWorkspaceDialog extends BaseDialog {

    private form: FormGroupReference;
    private placeholder = null;

    public async init() {

        await this.bootstrap(`dialogs/create-workspace/create-workspace.template.html`);
        this.bootstrapForm();
    }

    public bootstrapForm() {

        this.form          = FormGroup("#form--create-workspace");
        this.placeholder   = domat("#error-message");
        this.placeholder.css({'display': 'none'});

        this.form.submitIfValid(async (collection) => {
            this.onFormSubmit(collection);
        });
    }

    public async onFormSubmit(collection) {

        try {
            const response  = await WorkspaceApi.createNewWorkflow(collection);
            const workspace = response.body.data;

            ActiveRouter.get().redirect(`workspace/${workspace.id}`);
            this.close();
        }
        catch(error) {

            console.log(error);

            const errorMessage = error.body.message;
            this.placeholder.html(errorMessage);
            this.placeholder.css({'display': 'block'});
        }
    }
}