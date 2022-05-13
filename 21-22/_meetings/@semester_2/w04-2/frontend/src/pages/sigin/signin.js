import { domat } from "../../libs/domat.js";
import { template } from "../../libs/api.js";
import { signIn     } from "../../api/auth.api.js";
import { formGroup } from "../../libs/form.js";

const TEMPLATE = `template/sigin/signin.template.html`;

const bootstrapForm = () => {

    const placeholder   = domat("#error-message");
    placeholder.css({'display': 'none'});

    const form   = formGroup("#form--signin");
    form.submit(async (requestObject) => {

        if(!form.isFormValid()) {
            return;
        }

        try {
            await signIn(requestObject);
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