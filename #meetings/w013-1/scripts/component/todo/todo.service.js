const TodoManager  = (() => {

    const todoCollection    = [];

    const remove = (id) => {

        for(let i = 0; i < todoCollection.length; i++ ) {
            if(todoCollection[i].id == id) {
                return todoCollection.splice(i, 1);
            }
        }
    };

    const add = (inputValue) => {

        const todoItem   = {
            id      : todoCollection.length,
            item    : inputValue,
            state   : TodoState.ACTIVE
        };

        todoCollection.push(todoItem);
        return todoItem;
    };

    const get     = (index) => {

        if(index) return todoCollection[index];

        return todoCollection;
    };

    const filter = (callback) => {

        const newTodoCollection = [];

        for(const element of todoCollection) {
            if(callback(element)) {
                newTodoCollection.push(element);
            }
        }
        return newTodoCollection;
    }


    const set = (id, propertyObject) => {

        let todoItem = get(id);
        for(let key in propertyObject) {
            todoItem[key] = propertyObject[key];
        }
    };


    const getTodoItemCount = () => {
        return get().length;
    };


    const isEmpty = () => {
        return todoCollection.length == 0;
    };

    const hasItems = () => {
        return getTodoItemCount() > 0;
    };

    return {
        remove, add, get, set, isEmpty, getTodoItemCount, hasItems, filter
    };

})();