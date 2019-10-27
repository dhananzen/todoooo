function DomApi() {

    const TODO_INPUT_ID = "todo-input";
    const TODO_LIST_ID = "todo-list";

    var todoInput = document.getElementById(TODO_INPUT_ID);
    var todoList = document.getElementById(TODO_LIST_ID);

    const ITEM_CLASSNAME = "item";
    const CHECKBOX_ID = "is-done";

    return {
        initialize: function (keyDownListener) {
            todoInput.addEventListener('keydown', keyDownListener);
        },
        removeAllExistingTodos: function () {
            const firstElement = document.getElementsByClassName(ITEM_CLASSNAME)[0];
            if (!firstElement) return;
            todoList.removeChild(firstElement);
            this.removeAllExistingTodos();
        },

        clearInput: function () {
            todoInput.value = "";
            return;
        },

        renderTodosInDom: function (todos, toggleTodos) {
            todoList.append(...todos.map((todo) => this.createTodoItem(todo, toggleTodos)));
        },

        createTodoItem: function (todoObject, onclickHandler) {
            var todoItem = document.createElement("li");
            todoItem.className = ITEM_CLASSNAME;

            var isDone = this.renderCheckBox(todoObject, onclickHandler);
            todoItem.appendChild(isDone);

            var todoLabel = this.renderTodoLabel(todoObject);
            todoItem.appendChild(todoLabel);

            return todoItem;
        },

        renderCheckBox: function (todoObject, clickHandler) {
            var checkBox = document.createElement("input");
            checkBox.id = `${CHECKBOX_ID}-${todoObject.id}`;
            checkBox.type = "checkbox";
            checkBox.value = todoObject.id;
            checkBox.checked = todoObject.completed;
            checkBox.onclick = clickHandler

            return checkBox;
        },

        renderTodoLabel: function (todoObject) {
            var todoLabel = document.createElement("label");
            todoLabel.htmlFor = `${CHECKBOX_ID}-${todoObject.id}`;

            var textNode = document.createTextNode(todoObject.label);
            todoLabel.appendChild(textNode);

            return todoLabel;
        }
    }
}