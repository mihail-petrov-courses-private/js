import { domat } from "../../libs/domat.js";
import { template } from "../../libs/api.js";

const TEMPLATE = `template/sigin/signin.template.html`;

export default async ($domReference) => {

    const templateHtml = await template(TEMPLATE);
    $domReference.html(templateHtml);

    // if(templateChache.has(TEMPLATE)) {
    //     return $domReference.html(templateChache.get(TEMPLATE));
    // }
    
    // const templateHtml = await template(TEMPLATE);
    // templateChache.set(TEMPLATE, templateHtml);
    // $domReference.html(templateHtml);
};