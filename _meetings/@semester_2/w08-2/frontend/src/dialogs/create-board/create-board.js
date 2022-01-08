import { BaseDialog     } from '../base-dialog/base-dialog.js';
import { domat          } from '../../libs/domat.js'
import { FormGroup      } from '../../libs/form.js';
import { boardApi       } from "../../api/board.api.js";
import { ActiveRouter   } from '../../services/active-router.js';

export class CreateBoardDialog extends BaseDialog {

    workspaceId = null;
    form        = null;
    placeholder = null;

    async init(workspaceId) {

        this.workspaceId = workspaceId; 
        await this.bootstrap(`dialogs/create-board/create-board.template.html`);
        this.bootstrapForm();
    }

    bootstrapForm() {

        this.form          = FormGroup("#form--create-board");
        this.placeholder   = domat("#error-message");
        this.placeholder.css({'display': 'none'});

        this.form.submitIfValid(async (collection) => {
            this.onFormSubmit(collection);
        });
    }

    async onFormSubmit(collection) {

        try {
            const requestObject = {...collection, workspaceId: this.workspaceId };
            const response      = await boardApi.createNewBoard(requestObject);
            const entity        = response.body.data;
            ActiveRouter.get().redirect(`board/${entity.id}`);
            this.close();
        }
        catch(error) {
            const errorMessage = error.body.message;
            this.placeholder.html(errorMessage);
            this.placeholder.css({'display': 'block'});
        }
    }
}