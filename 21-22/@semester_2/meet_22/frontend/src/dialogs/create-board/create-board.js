import { BaseDialog } from '../base-dialog/base-dialog.js';
import { domat      } from '../../libs/domat.js'
import { formGroup  } from '../../libs/form.js';
import { boardApi   } from "../../api/board.api.js";
import { ActiveRouter } from '../../services/active-router.js';

export class CreateBoardDialog extends BaseDialog {

    workspaceId = null;

    async init(workspaceId) {

        this.workspaceId = workspaceId; 
        await this.bootstrap(`dialogs/create-board/create-board.template.html`);
        this.bootstrapForm();
    }

    bootstrapForm() {

        const form          = formGroup("#form--create-board");
        const placeholder   = domat("#error-message");
        placeholder.css({'display': 'none'});

        form.submit(async (collection) => {
            
            if(!form.isFormValid()) {
                return;
            }

            try {
                const requestObject = {...collection, workspaceId: this.workspaceId };
                const response      = await boardApi.createNewBoard(requestObject);
                const entity        = response.body.data;
                ActiveRouter.get().redirect(`board/${entity.id}`);
                this.close();
            }
            catch(error) {
                const errorMessage = error.body.message;
                placeholder.html(errorMessage);
                placeholder.css({'display': 'block'});
            }
        });
    }
}