import { template } from "../../libs/api.js";

const TEMPLATE = `template/notfound/notfound.template.html`;

export default async ($domReference) => {

    const templateHtml = await template(TEMPLATE);
    $domReference.html(templateHtml);
};