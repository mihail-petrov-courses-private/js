import { domat } from "../../libs/domat.js";
import { template } from "../../libs/api.js";
import { signIn     } from "../../api/auth.api.js";
import { formGroup } from "../../libs/form.js";
import { authManager } from "../../services/auth-manager.js";

const TEMPLATE = `template/sigin/signin.template.html`;

const bootstrapForm = () => {

    const form          = formGroup("#form--signin");
    const placeholder   = domat("#error-message");
    placeholder.css({'display': 'none'});

    form.submit(async (requestObject) => {

        if(!form.isFormValid()) {
            return;
        }

        try {
            const response  = await signIn(requestObject);
            const authToken = response.body.authToken;
            authManager.saveToken(authToken);
            window.location.hash = "#dashboard";
        }
        catch(error) {
            const errorMessage = error.body.message;
            placeholder.html(errorMessage);
            placeholder.css({'display': 'block'});
        }
    });
};


export default async ($domReference) => {

    const templateHtml = await template(TEMPLATE);
    $domReference.html(templateHtml);

    bootstrapForm();
};