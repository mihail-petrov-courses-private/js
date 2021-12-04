export const ContentBuilder = {};

const templateBlueprint = (boardElement) => {

    const {title, theme, id } = boardElement;

    return `
    <a href="#board/${id}">
        <div class="board board--${theme}">
            <div class="board-title">${title}</div>
        </div>
    </a>`
};

const templateEmptyBoard = () => {
    return `
    <div class="board board--default">
        <div 
            id="action--add-new-board" 
            class="board-title">
            Create new board
        </div>
    </div>`
}

ContentBuilder.build = (collection) => {

    const templateCollection = [];
    for(const element of collection) {

        const temlateString = templateBlueprint(element);
        templateCollection.push(temlateString);
    }

    const templateEmpty = templateEmptyBoard();
    templateCollection.push(templateEmpty);

    return templateCollection.join('');
};