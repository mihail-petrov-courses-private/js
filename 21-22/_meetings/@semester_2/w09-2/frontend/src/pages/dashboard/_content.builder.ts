export class ContentBuilder {

    public static build(collection) {
    
        const templateCollection = [];
        for(const element of collection) {
    
            const temlateString = ContentBuilder.templateBlueprint(element);
            templateCollection.push(temlateString);
        }
    
        const templateEmpty = ContentBuilder.templateEmptyBoard();
        templateCollection.push(templateEmpty);
    
        return templateCollection.join('');
    };


    private static templateBlueprint(boardElement) {

        const {title, theme, id } = boardElement;
    
        return `
        <a href="#board/${id}">
            <div class="board board--${theme}">
                <div class="board-title">${title}</div>
            </div>
        </a>`
    };
    
    private static  templateEmptyBoard() {
        return `
        <div class="board board--default">
            <div 
                id="action--add-new-board" 
                class="board-title">
                Create new board
            </div>
        </div>`
    }
};
