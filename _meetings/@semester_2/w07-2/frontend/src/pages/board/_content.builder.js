export const ContentBuilder = {};

/**
 * @author Mihail Petrov
 * @param {*} element 
 * @returns 
 */
const templateColumnBuilder = (element) => {

    const { title, id } = element;

    return `
    <div class="column-layout">
        ${title}
        <button 
            data-target="action"
            data-listid="${id}">Add card</button>

        <form 
            class="display-none"
            id="form--add-card--${id}"
            data-form="add-list">
            <input
                class="input" 
                type="text"
                data-name="title"
                placeholder="Card title">

            <button 
                class="input input-button input-button--green"
                data-name="signin"
                data-submit>
                Add card
            </button>
        </form>


    </div>
    `    
};

/**
 * @author Mihail Petrov
 * @param {*} collection 
 * @returns 
 */
const buildColumnTemplate = (collection) => {

    const template = [];
    for(const element of collection) {
        template.push(templateColumnBuilder(element));
    }

    return template.join('');
}

/**
 * @author Mihail Petrov
 * @param {*} data 
 * @returns 
 */
ContentBuilder.build = (data) => {
    return buildColumnTemplate(data);
};