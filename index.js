(function () {
    const TODO_INPUT_SELECTOR = "todo-input";
    const TODO_LIST_SELECTOR = "todo-list";

    var todoInput = document.getElementById(TODO_INPUT_SELECTOR);
    var todoList = document.getElementById(TODO_LIST_SELECTOR);

    let todos = [];
    let idCounter = 0;

    const clearInput = function () {
        todoInput.value = "";
        return;
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

            const todoValue = e.target.value,
                todoId = idCounter++;

            todos.push({ label: todoValue, id: todoId });
            clearInput();
            renderTodos();
        }
        return false;
    };

    todoInput.addEventListener('keydown', handleKeyDownInInput);

})();



const createTodoItem = function (todoObject) {
    var todoItem = document.createElement("div");
    todoItem.className = "item";

    var isDone = renderCheckBox(todoObject, todoItem);
    todoItem.appendChild(isDone);

    var todoLabel = renderTodoLabel(todoObject);
    todoItem.appendChild(todoLabel);

    return todoItem;
}

function renderTodoLabel(todoObject) {
    var todoLabel = document.createElement("span");
    var textNode = document.createTextNode(todoObject.label);
    todoLabel.appendChild(textNode);

    return todoLabel;
}

function renderCheckBox(todoObject) {
    var isDoneCheckBox = document.createElement("input");
    isDoneCheckBox.type = "checkbox";
    isDoneCheckBox.value = todoObject.id;
    isDoneCheckBox.checked = false;
    isDoneCheckBox.onclick = function (e) {
        console.log("onClick", e.target.value);
    }

    return isDoneCheckBox;
}