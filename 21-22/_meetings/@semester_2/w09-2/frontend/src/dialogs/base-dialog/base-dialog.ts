import { domat      } from '../../libs/domat.js'
import { template   } from '../../libs/api.js'

export abstract class BaseDialog {

    public abstract init(externalProperty: {});

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

    async bootstrap($templateUrl) {

        // reference body
        const context           = domat(document.body);
        const templateHtml      = await template($templateUrl);
        const templateWrapper   = this._createWrapperTemplate(templateHtml);
        context.after(templateWrapper);

        const actionClose = domat("#close-dialog");
        actionClose.on('click', () => {
            this.close();
        });
    };

    close() {
        const element = domat("#current-dialog")
        element.removeFromDom();
    };
}