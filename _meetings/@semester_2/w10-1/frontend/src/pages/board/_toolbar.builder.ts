export class ToolbarBuilder {

    public static build(data) {
        return ToolbarBuilder.template(data);
    };

    private static template(boardElement) {

        const { title } = boardElement;
    
        return `
            <div> ${title} </div>
        `;
    };
};