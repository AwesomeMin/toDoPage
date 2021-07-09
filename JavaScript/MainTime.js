const DateDisplay = document.querySelector("#Date");
const DayArr = ["(일)", "(월)", "(화)", "(수)", "(목)", "(금)", "(토)"];
const PreviousButton = document.querySelector("#prevButton");
const NextButton = document.querySelector("#nextButton");
const DateSelector = document.querySelector("#DateSelector")

let date = new Date();
let years = date.getFullYear();
let months = date.getMonth() + 1;
let days = date.getDay();
let datee = date.getDate();

function handleDateSelector(event) {
    // years = event.target.value.split("-")[0];
    // months = event.target.value.split("-")[1];
    // datee = event.target.value.split("-")[2];
    // days = event.target.valueAsDate.getDay();
    // displayDate();
    date.setFullYear(parseInt(event.target.value.split("-")[0]));
    date.setMonth(parseInt(event.target.value.split("-")[1]) - 1);
    date.setDate(parseInt(event.target.value.split("-")[2]));
    displayDate();
    if(savedTodos !== null) {
        const parsedToDos = JSON.parse(savedTodos);
        toDos = parsedToDos;
        parsedToDos.forEach(changeDate);
    }
}

function changeDate(obj) {
    const li = document.getElementById(obj.id);
    if(obj.date === DateDisplay.innerText) {
        li.classList.remove("hidden");
    } else {
        li.classList.add("hidden");
    }
}

function handlePrevButton() {
    date.setDate(date.getDate() - 1);
    displayDate();
    const savedTodos = localStorage.getItem("toDos");
    if(savedTodos !== null) {
        const parsedToDos = JSON.parse(savedTodos);
        toDos = parsedToDos;
        parsedToDos.forEach(changeDate);
    }
}

function handleNextButton() {
    date.setDate(date.getDate() + 1);
    displayDate();
    const savedTodos = localStorage.getItem("toDos");
    if(savedTodos !== null) {
        const parsedToDos = JSON.parse(savedTodos);
        toDos = parsedToDos;
        parsedToDos.forEach(changeDate);
    }
}

function displayDate() {
    DateDisplay.innerText = `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일 ${DayArr[date.getDay()]}`;
}

PreviousButton.addEventListener("click", handlePrevButton);
NextButton.addEventListener("click", handleNextButton);
DateSelector.addEventListener("input", handleDateSelector);

displayDate();