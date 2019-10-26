(function () {

    let todos = [];
    let idCounter = 0;

    const domApi = new DomApi();

    const renderUpdatedTodos = function () {
        domApi.removeAllExistingTodos();
        domApi.renderTodosInDom(todos, toggleTodo);
    }
    
    const toggleTodo = function (e) {
        const todoId = e.target.value;

        todos = todos.map((todo) => {
            if (todo.id === todoId)
                todo.completed = !todo.completed;
            return todo;
        });

        renderUpdatedTodos(todos);
    };

    const handleKeyDownInInput = function (e) {
        var keyEntered = e.keyCode || e.which,
            isEnterKeyPressed = keyEntered === 13;

        if (isEnterKeyPressed) {

            const todoValue = e.target.value,
                todoId = idCounter++;

            const newTodoObject = { label: todoValue, id: `${todoId}`, completed: false };

            todos.push(newTodoObject);
            domApi.clearInput();
            renderUpdatedTodos(todos);
        }
        return false;
    };

    domApi.initialize(handleKeyDownInInput);

})();