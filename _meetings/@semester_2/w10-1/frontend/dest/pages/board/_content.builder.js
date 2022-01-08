export class ContentBuilder {
    static build(data) {
        return ContentBuilder.templateColumnBuilder(data);
    }
    ;
    static templateCard(cardElement) {
        const { id, title } = cardElement;
        return `
            <div 
                class="card"
                data-target="card"
                data-cardid="${id}">
                ${title}
            </div>
        `;
    }
    ;
    static templateCardBuilder(cardCollection) {
        const cardTemplate = [];
        for (const cardElement of cardCollection) {
            const template = ContentBuilder.templateCard(cardElement);
            cardTemplate.push(template);
        }
        return cardTemplate.join('');
    }
    static templateColumn(element) {
        const { title, id } = element;
        const cardTemplate = ContentBuilder.templateCardBuilder(element.cards);
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
        </div>`;
    }
    ;
    static templateColumnBuilder(collection) {
        const template = [];
        for (const element of collection) {
            template.push(ContentBuilder.templateColumn(element));
        }
        return template.join('');
    }
}
