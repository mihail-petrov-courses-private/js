import { BaseDialog     } from '../base-dialog/base-dialog.js';
import { FormGroup      } from '../../libs/form.js';
import { workspaceApi   } from "../../api/workspace.api.js";
import { domat          } from '../../libs/domat.js';
import { ActiveRouter   } from '../../services/active-router.js';

export class CreateWorkspaceDialog extends BaseDialog {

    form        = null;
    placeholder = null;

    async init() {

        await this.bootstrap(`dialogs/create-workspace/create-workspace.template.html`);
        this.bootstrapForm();
    }

    bootstrapForm() {

        this.form          = FormGroup("#form--create-workspace");
        this.placeholder   = domat("#error-message");
        this.placeholder.css({'display': 'none'});

        this.form.submitIfValid(async (collection) => {
            this.onFormSubmit(collection);
        });
    }

    async onFormSubmit(collection) {

        try {
            const response  = await workspaceApi.createNewWorkflow(collection);
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