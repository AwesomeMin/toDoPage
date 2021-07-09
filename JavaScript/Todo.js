const toDoForm = document.querySelector("#ToDoForm");
const titleInput = toDoForm.querySelector("#TitleInput");
const contentInput = toDoForm.querySelector("#ContentInput")
const toDoList = document.querySelector("ul");
let toDos = [];

function handleCbox(event) {
    const li = event.target.parentElement;
    const title = event.path[1].children[0];
    const content = event.path[1].children[3];
    title.classList.toggle("done");
    content.classList.toggle("done");
    toDos.forEach(toDo => {
        if(toDo.id === parseInt(li.id) && event.target.checked) {
            toDo.done = 1;
        } else if (toDo.id === parseInt(li.id) && !event.target.checked){
            toDo.done = 0;
        }
    })
    saveToDos();
}

function saveToDos() {
    localStorage.setItem("toDos", JSON.stringify(toDos));
}

function deleteToDo(event) {
    const li = event.target.parentElement;
    li.remove();
    toDos = toDos.filter(toDo => toDo.id !== parseInt(li.id));
    saveToDos();
}

function addNewToDo(obj) {
    const li = document.createElement("li");
    li.id = obj.id;
    const title = document.createElement("span");
    title.innerText = obj.title;
    const content = document.createElement("span");
    content.innerHTML = `<br>${obj.content}`;
    const button = document.createElement("button");
    button.addEventListener("click", deleteToDo);
    button.innerText = "delete"
    const cbox = document.createElement("input");
    cbox.type="checkbox"
    cbox.addEventListener("click", handleCbox);
    if(obj.done === 1) {
        title.classList.add("done");
        content.classList.add("done");
        cbox.checked = true;
    }
    li.appendChild(title);
    li.appendChild(cbox);
    li.appendChild(button);
    li.appendChild(content);
    toDoList.appendChild(li);
}

function handleInputForm(event) {
    event.preventDefault();
    title = titleInput.value;
    content = contentInput.value;
    const newToDoObject = {
        title: title,
        content: content,
        id: Date.now(),
        done: 0,
        date: DateDisplay.innerText
    }
    addNewToDo(newToDoObject);
    titleInput.value = "";
    contentInput.value = "";
    toDos.push(newToDoObject);
    saveToDos();
}

toDoForm.addEventListener("submit", handleInputForm);

const savedTodos = localStorage.getItem("toDos");

if(savedTodos !== null) {
    const parsedToDos = JSON.parse(savedTodos);
    toDos = parsedToDos;
    parsedToDos.forEach(addNewToDo);
}