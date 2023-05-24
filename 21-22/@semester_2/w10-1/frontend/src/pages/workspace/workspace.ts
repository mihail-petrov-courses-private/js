import { template       } from "../../libs/api.js";

const TEMPLATE = `template/workspace/workspace.template.html`;

const bootstrap = async () => {

};

export default async ($domReference) => {

    const templateHtml = await template(TEMPLATE);
    $domReference.html(templateHtml);

    bootstrap();
};