var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { domat } from "../../libs/domat.js";
import { template } from "../../libs/api.js";
import { signIn } from "../../api/auth.api.js";
import { FormGroup } from "../../libs/form.js";
import { AuthManager } from "../../services/auth-manager.js";
const TEMPLATE = `template/sigin/signin.template.html`;
const bootstrapForm = () => {
    const form = FormGroup("#form--signin");
    const placeholder = domat("#error-message");
    placeholder.css({ 'display': 'none' });
    form.submit((requestObject) => __awaiter(void 0, void 0, void 0, function* () {
        if (!form.isFormValid()) {
            return;
        }
        try {
            const response = yield signIn(requestObject);
            const authToken = response.body.authToken;
            AuthManager.saveToken(authToken);
            window.location.hash = "#dashboard";
        }
        catch (error) {
            const errorMessage = error.body.message;
            placeholder.html(errorMessage);
            placeholder.css({ 'display': 'block' });
        }
    }));
};
export default ($domReference) => __awaiter(void 0, void 0, void 0, function* () {
    const templateHtml = yield template(TEMPLATE);
    $domReference.html(templateHtml);
    bootstrapForm();
});
