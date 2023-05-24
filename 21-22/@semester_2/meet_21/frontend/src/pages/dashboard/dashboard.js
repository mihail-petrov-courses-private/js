import { domat          } from "../../libs/domat.js";
import { template       } from "../../libs/api.js";
import { workspaceApi   } from "../../api/workspace.api.js";

import createWorkspaceDialog from "../../dialogs/create-workspace/create-workspace.js";



const templateBlueprint = (workspaceElement) => {

    const title         = workspaceElement.title; 
    const firstLetter   = title[0];
    const category      = workspaceElement.category.toLowerCase();

    return `
    <div class="menu-category">
        <div class="menu-category--header">
            <span class="menu-category--sign menu-category--sign-${category}">
                ${firstLetter}
            </span>
            <span class="menu-category--title">${title}</span>
            <div class="menu-category--icon">
                <i class='bx bxs-chevron-down'></i>
            </div>
        </div>
        <ul class="menu-category--menu">
            <li class="menu-category--menu-item">Boards</li>
            <li class="menu-category--menu-item">Members</li>
            <li class="menu-category--menu-item">Settings</li>
        </ul>
    </div>`;
};

const templateBuilder = (collection) => {

    const templateCollection = [];
    for(const element of collection) {

        const temlateString = templateBlueprint(element);
        templateCollection.push(temlateString);
    }

    return templateCollection.join('');
};

const TEMPLATE = `template/dashboard/dashboard.template.html`;

const bootstrap = async () => {

    // Dom references
    const worspacePlaceholder           = domat("#app-sidebar--workspaces");
    const actionAddNewWorkspace         = domat("#action--add-new-workspace");
    const workspaceErrorPlaceholder     = domat("#workspace-error");

    await fetchAllWorkspaces();


    actionAddNewWorkspace.on('click', () => {
        createWorkspaceDialog(domat(document.body));
    });
};

const fetchAllWorkspaces = async () => {

    const worspacePlaceholder   = domat("#app-sidebar--workspaces");
    const response              = await workspaceApi.getAllWorkflow();
    const collection            = response.body;
    const template              = templateBuilder(collection);
    worspacePlaceholder.html(template);
}

export default async ($domReference) => {

    const templateHtml = await template(TEMPLATE);
    $domReference.html(templateHtml);

    bootstrap();
};