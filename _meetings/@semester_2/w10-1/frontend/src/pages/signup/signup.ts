import { domat      } from "../../libs/domat.js";
import { template   } from "../../libs/api.js";
import { signUp     } from "../../api/auth.api.js";
import { FormGroup  } from "../../libs/form.js";

const TEMPLATE = `template/signup/signup.template.html`;

const bootstrapForm = () => {

    const form          = FormGroup("#form--signup");
    const placeholder   = domat("#error-message");
    placeholder.css({'display': 'none'});

    form.submit(async (requestObject) => {

        if(!form.isFormValid()) {
            return;
        }

        try {
            await signUp(requestObject);
            window.location.hash = "#signin";
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