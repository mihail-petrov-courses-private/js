import { template       } from '../../libs/api.js';
import { formGroup      } from '../../libs/form.js';
import { workspaceApi   } from "../../api/workspace.api.js";
import { domat          } from '../../libs/domat.js';

const TEMPLATE = `dialogs/create-workspace/create-workspace.template.html`;

const bootstrapForm = () => {

    const form = formGroup("#form--create-workspace");
    const placeholder   = domat("#error-message");
    placeholder.css({'display': 'none'});

    form.submit(async (collection) => {

        if(!form.isFormValid()) {
            return;
        }

        try {
            const response  = await workspaceApi.createNewWorkflow(collection);
            const workspace = response.body.data;

            // close 
            close();

            // redirect
            window.location.hash = `#workspace/${workspace.id}`
        }
        catch(error) {

            console.log(error);

            const errorMessage = error.body.message;
            placeholder.html(errorMessage);
            placeholder.css({'display': 'block'});
        }
    });
}

const close = () => {
    const element = domat("#current-dialog")
    console.log(element);
    element.removeFromDom();
};

export default async ($domReference) => {

    const templateHtml      = await template(TEMPLATE);
    const templateWrapper   = `<div id="current-dialog">${templateHtml}</div>`;
    $domReference.after(templateWrapper);

    bootstrapForm();
};