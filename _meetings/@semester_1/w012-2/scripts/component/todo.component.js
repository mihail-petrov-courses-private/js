// dom reference
const componentTodoInput        = domat("#component-todo--input");
const componentTodoInputAction  = domat("#component-todo--input-action");
const componentTodoList         = domat("#component-todo--list");
const componentTodoToolbar      = domat("#component-todo--toolbar");
const componentTodoToolbarTotal = domat("#component-todo--toolbar-total");

const TodoState = {
    ACTIVE : 999,
    DONE : 1999
};

// collection reference
const TodoManager       = {}
const todoCollection    = [];

TodoManager.remove = (id) => {

    for(let i = 0; i < todoCollection.length; i++ ) {
        if(todoCollection[i].id == id) {
            return todoCollection.splice(i, 1);
        }
    }
};


TodoManager.add = (inputValue) => {

    const todoItemId = todoCollection.length; //0
    todoCollection.push({
        id      : todoItemId,
        item    : inputValue,
        state   : TodoState.ACTIVE
    });

    return todoItemId;
};

TodoManager.get     = () => {
    return todoCollection;
}

TodoManager.isEmpty = () => {
    return todoCollection.length == 0;
}

const getTodoItemTemplate = (itemReference) => {
    return `<div class="todo--item">
                <div class="panel">${itemReference.inputValue}</div>
                <div class="panel todo--item-action">
                    <button 
                        data-id="${itemReference.todoItemId}" 
                        data-action="done" 
                        class="button-acction bg--89e051">готово</button>
                    <button 
                        data-id="${itemReference.todoItemId}" 
                        data-action="remove" 
                        class="button-acction bg--d60b52">премахни</button>
                </div>
            </div>`
};

const getTodoListTemplate = () => {
    
    if(TodoManager.isEmpty()) {
        return '';
    }

    const template = [];

    for(const element of TodoManager.get()) {
        template.push(getTodoItemTemplate({
            inputValue: element.item,
            todoItemId: element.id
        }));        
    }

    return template.join('');
};

const renderTodoList = () => {
    componentTodoList.html(getTodoListTemplate());

    if(todoCollection.length == 0) {
        componentTodoToolbar.addClass('hide');
        componentTodoToolbarTotal.html(getTotalResultText());
    }
};

const getTotalResultText = () => {
    const totalTaskCount = todoCollection.length;
    return `общо задачи ${totalTaskCount}`;
}

const addTodoElement = (inputValue) => {

    const todoItemId = TodoManager.add(inputValue);
    componentTodoList.append(getTodoItemTemplate({
        inputValue, todoItemId
    }));

    componentTodoInput.value("");

    if(todoCollection.length > 0) {
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

    if(action == 'remove') {

        TodoManager.remove(elementId);
        renderTodoList();
    }

    if(action == 'done') {

        todoCollection[elementId].state = TodoState.DONE;
        renderTodoList();
    }
});