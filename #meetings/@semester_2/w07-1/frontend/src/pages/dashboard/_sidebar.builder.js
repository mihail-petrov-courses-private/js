export const SidebarBuilder = {};

const templateBlueprint = (workspaceElement) => {

    const title         = workspaceElement.title; 
    const id            = workspaceElement.id;
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
            <li class="menu-category--menu-item">
                <a href="#dashboard/workspace/${id}">Boards</a>
            </li>
            <li class="menu-category--menu-item">Members</li>
            <li class="menu-category--menu-item">Settings</li>
        </ul>
    </div>`;
};

SidebarBuilder.build = (collection) => {

    const templateCollection = [];
    for(const element of collection) {

        const temlateString = templateBlueprint(element);
        templateCollection.push(temlateString);
    }

    return templateCollection.join('');
};