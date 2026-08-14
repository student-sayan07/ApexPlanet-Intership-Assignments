const taskInput =
    document.getElementById("taskInput");

const addTaskBtn =
    document.getElementById("addTaskBtn");

const taskList =
    document.getElementById("taskList");

const emptyMessage =
    document.getElementById("emptyMessage");


addTaskBtn.addEventListener("click", addTask);


taskInput.addEventListener("keypress", function (event) {

    if (event.key === "Enter") {

        addTask();

    }

});



function addTask() {


    const taskText =
        taskInput.value.trim();



    if (taskText === "") {

        alert("Please enter a task.");

        return;
    }



    const listItem =
        document.createElement("li");

    listItem.className = "task-item";



    const text =
        document.createElement("span");

    text.className = "task-text";

    text.textContent = taskText;


  

    const actions =
        document.createElement("div");

    actions.className = "task-actions";



    const completeButton =
        document.createElement("button");

    completeButton.className = "complete-btn";

    completeButton.textContent = "Complete";



    const deleteButton =
        document.createElement("button");

    deleteButton.className = "delete-btn";

    deleteButton.textContent = "Delete";



    completeButton.addEventListener(
        "click",
        function () {

            text.classList.toggle("completed");

        }
    );


    deleteButton.addEventListener(
        "click",
        function () {

            listItem.remove();

            updateEmptyMessage();

        }
    );


    actions.appendChild(completeButton);

    actions.appendChild(deleteButton);

    listItem.appendChild(text);

    listItem.appendChild(actions);

    taskList.appendChild(listItem);

    taskInput.value = "";

    taskInput.focus();


    updateEmptyMessage();

}
function updateEmptyMessage() {

    if (taskList.children.length === 0) {

        emptyMessage.style.display = "block";

    } else {

        emptyMessage.style.display = "none";

    }

}