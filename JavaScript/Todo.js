const toDoForm = document.querySelector("#ToDoForm");
const titleInput = toDoForm.querySelector("#TitleInput");
const contentInput = toDoForm.querySelector("#ContentInput")
const toDoList = document.querySelector("ul");
const achieveDegreeIndicator = document.querySelector("#achieveDegree");
let toDos = [];

function calculateDegree() {
    let achieveDegree = 0;
    let totalDegree = 0;
    let lengthOfToDos = 0;
    toDos.forEach(toDo => {
        if(toDo.date === DateDisplay.innerText) {
            lengthOfToDos = lengthOfToDos + 1;
            totalDegree = totalDegree + toDo.degree;
        }
    })
    achieveDegree = totalDegree/lengthOfToDos;
    if(isNaN(achieveDegree)) {
        achieveDegreeIndicator.innerText = "아직 이 날의 일정이 없습니다.";
    } else {
        achieveDegreeIndicator.innerText = `${achieveDegree}%`;
    }
}

function handleChangeDegree(event) {
    event.target.parentElement.children[3].classList.remove("hidden");
    event.target.parentElement.children[4].classList.add("hidden");
    toDos.forEach(toDo => {
        if (toDo.id === parseInt(event.target.parentElement.id)) {
            toDo.degree = 0;
        }
    })
    saveToDos();
}

function handleDegree(event) {
    const degreeText = event.target.parentElement.children[4];
    const targetValue = parseInt(event.target.value);
    if (targetValue > 100 || targetValue < 0 || targetValue == '') {
        targetValue = null;
        alert("1과 100 사이의 숫자를 입력해주세요.");
    }
    else {
    toDos.forEach(toDo => {
        if (toDo.id === parseInt(event.target.parentElement.id)) {
            toDo.degree = parseInt(targetValue);
        }
    })
    saveToDos();
    event.target.classList.add("hidden");
    degreeText.classList.remove("hidden");
    degreeText.innerText = ` ${targetValue}%`
    event.path[1].insertBefore(degreeText, event.path[1].children[5]);
    calculateDegree();
    }
}

function handleCbox(event) {
    const li = event.target.parentElement;
    const title = event.path[1].children[0];
    const content = event.path[1].children[6];
    const degree = event.path[1].children[3];
    const degreeText = event.path[1].children[4];
    degree.classList.toggle("hidden");
    title.classList.toggle("done");
    content.classList.toggle("done");
    toDos.forEach(toDo => {
        if(toDo.id === parseInt(li.id) && event.target.checked) {
            toDo.done = 1;
            degree.classList.remove("hidden");
        } else if (toDo.id === parseInt(li.id) && !event.target.checked){
            toDo.done = 0;
            toDo.degree = 0;
            degreeText.classList.add("hidden");
            degree.classList.add("hidden");
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
    calculateDegree();
}

function addNewToDo(obj) {
    const br = document.createElement("br");
    const li = document.createElement("li");
    li.id = obj.id;
    const title = document.createElement("span");
    title.innerText = obj.title;
    const content = document.createElement("span");
    content.innerText = obj.content;
    const button = document.createElement("button");
    button.addEventListener("click", deleteToDo);
    button.innerText = "delete";
    const cbox = document.createElement("input");
    cbox.type="checkbox";
    cbox.addEventListener("click", handleCbox);
    const degree = document.createElement("input");
    degree.type="number";
    degree.classList.add("hidden");
    degree.placeholder="몇 퍼센트 완료했나요?";
    degree.addEventListener("change", handleDegree);
    const degreeText = document.createElement("span");
    degreeText.classList.add("hidden");
    degreeText.addEventListener("click", handleChangeDegree);
    if(obj.done === 1) {
        title.classList.add("done");
        content.classList.add("done");
        degree.classList.remove("hidden");
        cbox.checked = true;
        degree.classList.add("hidden");
        degreeText.innerText = `${obj.degree}%`;
        degreeText.classList.remove("hidden");
    }
    li.appendChild(title);
    li.appendChild(cbox);
    li.appendChild(button);
    li.appendChild(degree);
    li.appendChild(degreeText);
    li.appendChild(br);
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
        date: DateDisplay.innerText,
        degree: 0
    }
    addNewToDo(newToDoObject);
    titleInput.value = "";
    contentInput.value = "";
    toDos.push(newToDoObject);
    saveToDos();
    calculateDegree();
}

toDoForm.addEventListener("submit", handleInputForm);

const savedTodos = localStorage.getItem("toDos");

if(savedTodos !== null) {
    const parsedToDos = JSON.parse(savedTodos);
    toDos = parsedToDos;
    parsedToDos.forEach(addNewToDo);
    parsedToDos.forEach(changeDate);
}

calculateDegree();