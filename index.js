(function () {
    const TODO_INPUT_SELECTOR = "todo-input";
    const TODO_LIST_SELECTOR = "todo-list";

    var todoInput = document.getElementById(TODO_INPUT_SELECTOR);
    var todoList = document.getElementById(TODO_LIST_SELECTOR);

    let todos = [];
    // let idCounter = 0;

    const clearInput = function () {
        todoInput.value = "";
        return;
    }

    const createTodoItem = function (todoString) {
        var todoItem = document.createElement("div");
        var isDoneCheckBox = document.createElement("input");

        // isDoneCheckBox.type = "checkbox";
        // isDoneCheckBox.value = ""
        // todoItem.appendChild()

        todoItem.textContent = todoString;
        todoItem.className = "item";
        return todoItem;
    }

    const removeAllExistingTodos = function () {
        const firstElement = document.getElementsByClassName("item")[0];
        if (!firstElement) return;
        todoList.removeChild(firstElement);
        removeAllExistingTodos();
    }

    const renderTodos = function () {
        removeAllExistingTodos()
        todoList.append(...todos.map(createTodoItem));
    }

    const handleKeyDownInInput = function (e) {
        var keyEntered = e.keyCode || e.which,
            isEnterKeyPressed = keyEntered === 13;

        if (isEnterKeyPressed) {
            todos.push(e.target.value);
            clearInput();
            renderTodos();
        }
        return false;
    };

    todoInput.addEventListener('keydown', handleKeyDownInInput);

})();