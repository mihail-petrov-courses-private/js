export const ToolbarBuilder = {};

const template = (boardElement) => {

    const { title } = boardElement;

    return `
        <div> ${title} </div>
    `;
};

ToolbarBuilder.build = (data) => {
    return template(data);
};