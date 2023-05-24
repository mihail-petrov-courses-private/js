export const ContentBuilder = {};

/**
 * 
 * @param {*} cardElement 
 * @returns 
 */
const templateCard = (cardElement) => {

    const { id, title } = cardElement;

    return `
        <div 
            class="card"
            data-target="card"
            data-cardid="${id}">
            ${title}
        </div>
    `;
};

/**
 * 
 * @param {*} cardCollection 
 * @returns 
 */
const templateCardBuilder = (cardCollection) => {


    const cardTemplate = [];
    for(const cardElement of cardCollection) {

        const template = templateCard(cardElement);
        cardTemplate.push(template);
    }

    return cardTemplate.join('');
}


/**
 * @author Mihail Petrov
 * @param {*} element 
 * @returns 
 */
const templateColumn = (element) => {

    const { title, id } = element;
    const cardTemplate  = templateCardBuilder(element.cards);

    return `
    <div class="column-layout">
        ${title}

        <div 
            class="card-placeholder">
            ${cardTemplate}
        </div>

        <button 
            class="add-card"
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
const templateColumnBuilder = (collection) => {

    const template = [];
    for(const element of collection) {
        template.push(templateColumn(element));
    }

    return template.join('');
}

/**
 * @author Mihail Petrov
 * @param {*} data 
 * @returns 
 */
ContentBuilder.build = (data) => {
    return templateColumnBuilder(data);
};