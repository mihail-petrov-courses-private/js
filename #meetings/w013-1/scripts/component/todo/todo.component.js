// dom reference
const componentTodoInput            = domat("#component-todo--input");
const componentTodoInputAction      = domat("#component-todo--input-action");
const componentTodoList             = domat("#component-todo--list");
const componentTodoToolbar          = domat("#component-todo--toolbar");
const componentTodoToolbarTotal     = domat("#component-todo--toolbar-total");
const componentTodoToolbarAction    = domat("#component-todo--toolbar-action");

const getTodoItemTemplate = (itemReference) => {

    const todoItemId = itemReference.id;
    const inputValue = itemReference.item;
    const stateClass = (itemReference.state == TodoState.DONE) 
                        ? 'state--done' 
                        : 'state--active';

    const activateActionVisibleClass = (itemReference.state == TodoState.DONE  ) ? '' : 'hide';
    const doneActionVisibleClass     = (itemReference.state == TodoState.ACTIVE) ? '' : 'hide';

    return `<div class="todo--item ${stateClass}">
                <div class="panel">${inputValue}</div>
                <div class="panel todo--item-action">

                    <button 
                        data-id="${todoItemId}" 
                        data-action="${TodoActionEnum.ACTIVATE}" 
                        class="button-acction bg--4485f5 ${activateActionVisibleClass}">активирай</button>
                    <button 
                        data-id="${todoItemId}" 
                        data-action="${TodoActionEnum.DONE}" 
                        class="button-acction bg--89e051 ${doneActionVisibleClass}">готово</button>
                    <button 
                        data-id="${todoItemId}" 
                        data-action="${TodoActionEnum.REMOVE}" 
                        class="button-acction bg--d60b52">премахни</button>
                </div>
            </div>`
};

const getTodoListTemplate = (collection) => {
    
    // if(TodoManager.isEmpty()) {
    if(collection.length == 0) {
        return '';
    }

    const template = [];

    for(const element of collection) {
        template.push(getTodoItemTemplate(element));        
    }

    return template.join('');
};

const renderTodoList = (collection) => {

    componentTodoList.html(getTodoListTemplate(collection));

    if(TodoManager.isEmpty()) {

        componentTodoToolbar.addClass('hide');
        componentTodoToolbarTotal.html(getTotalResultText());
    }
};

const getTotalResultText = () => {

    const totalTaskCount = TodoManager.getTodoItemCount();
    return `общо задачи ${totalTaskCount}`;
}

const addTodoElement = (inputValue) => {

    const todoItem = TodoManager.add(inputValue);
    const template = getTodoItemTemplate(todoItem);
    componentTodoList.append(template);
    componentTodoInput.value("");

    if(TodoManager.hasItems()) {

        componentTodoToolbar.removeClass('hide');
        componentTodoToolbarTotal.html(getTotalResultText());
    }
};

componentTodoInputAction.on('click', () => {

    const input         = componentTodoInput.value();
    const isProcessable = input.length > 0;

    if(isProcessable) {
        addTodoElement(componentTodoInput.value());
    }
});

componentTodoInput.on('keypress', (event) => {

    const input         = componentTodoInput.value();
    const isEnter       = event.code == "Enter";
    const isTextInputed = input.length > 0;
    const isProcessable = isEnter && isTextInputed;

    if(isProcessable) {
        addTodoElement(componentTodoInput.value());
    }
});

componentTodoList.on('click', (event) => {

    const domElement    = domat(event.target);
    const action        = domElement.attr('data-action');
    const elementId     = domElement.attr('data-id');

    if(action == TodoActionEnum.REMOVE) {
        TodoManager.remove(elementId);
        PubSub.process("render", TodoManager.get());
    }

    if(action == TodoActionEnum.DONE) {
        TodoManager.set(elementId, { state : TodoState.DONE });
        PubSub.process("update-counter");
        PubSub.process("render", TodoManager.get());
    }

    if(action == TodoActionEnum.ACTIVATE) {
        TodoManager.set(elementId, { state : TodoState.ACTIVE });
        PubSub.process("render", TodoManager.get());
    }
});

componentTodoToolbarAction.on('click', (event) => {

    const domElement    = domat(event.target);
    const filter        = domElement.attr('data-filter');

    if(filter == 'all') {
        PubSub.process("render", TodoManager.get());
    }

    if(filter == 'active') {
        PubSub.process("render", TodoManager.filter(element => {
            return element.state == TodoState.ACTIVE
        }));
    }

    if(filter == 'done') {
        PubSub.process("render", TodoManager.filter(element => {
            return element.state == TodoState.DONE
        }));
    }    
});


PubSub.register('render', (collection) => {
    renderTodoList(collection);
})