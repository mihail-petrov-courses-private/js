var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { domat } from '../../libs/domat.js';
import { template } from '../../libs/api.js';
export class BaseDialog {
    _createWrapperTemplate(templateHtml) {
        return `
        <div id="current-dialog">
            <div class="dialog-wrapper">
                
                <div class="dialog">
                <div id="close-dialog">X</div>
                    ${templateHtml}
                </div>
            </div>
        </div>`;
    }
    bootstrap($templateUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            // reference body
            const context = domat(document.body);
            const templateHtml = yield template($templateUrl);
            const templateWrapper = this._createWrapperTemplate(templateHtml);
            context.after(templateWrapper);
            const actionClose = domat("#close-dialog");
            actionClose.on('click', () => {
                this.close();
            });
        });
    }
    ;
    close() {
        const element = domat("#current-dialog");
        element.removeFromDom();
    }
    ;
}
