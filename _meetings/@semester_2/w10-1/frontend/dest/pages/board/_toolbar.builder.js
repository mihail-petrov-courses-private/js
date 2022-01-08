export class ToolbarBuilder {
    static build(data) {
        return ToolbarBuilder.template(data);
    }
    ;
    static template(boardElement) {
        const { title } = boardElement;
        return `
            <div> ${title} </div>
        `;
    }
    ;
}
;
