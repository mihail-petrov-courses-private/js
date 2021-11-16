import { domat          } from "../../libs/domat.js";
import { template       } from "../../libs/api.js";
import { workspaceApi   } from "../../api/workspace.api.js";

const templateBlueprint = (title) => {
    return `
    <div class="menu-category">
        <div class="menu-category--header">
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

        const temlateString = templateBlueprint(element.title);
        templateCollection.push(temlateString);
    }

    return templateCollection.join('');
};



// formActionSubmit.on('click', (e) => {

//     e.preventDefault();

//     const title     =  formInputWorkspaceTitle.value();
//     const category  = formSelectWorkspaceCategory.value();
//     const overview  = formTextWorkspaceOverview.value();
//     const workflow  = {
//         title, category, overview, ownerId: 1
//     };

//     createNewWorkflow(workflow).then(collection => {

//         console.log(collection);
//         return collection.json();
//     }).then(data => {
//         console.log(data);
//     }).catch(error => {
//         console.log('Error state');
//         console.log(error);
//         workspaceErrorPlaceholder.html(error)
//     })
// });

const TEMPLATE = `template/dashboard/dashboard.template.html`;

const bootstrap = async () => {

    // Dom references
    const worspacePlaceholder           = domat("#app-sidebar--workspaces");
    const actionAddNewWorkspace         = domat("#action--add-new-workspace");
    const workspaceErrorPlaceholder     = domat("#workspace-error");

    await fetchAllWorkspaces();
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