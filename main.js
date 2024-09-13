console.log("Запускаем приложение...")


// поиск обьектов
const form = document.querySelector('#form');
const taskInput = document.querySelector('#taskInput');
const taskList = document.querySelector('#taskList');
const emptyList = document.querySelector('#emptyList');

let tasks = [];

// проверяем хранилище и забираем данные
if (localStorage.getItem('tasks')) {

    tasks = JSON.parse(localStorage.getItem('tasks'));
    console.log(tasks);
}

// Функция пребериает и встявляет разметку из Storage 
tasks.forEach(function (task) {
    // Формируем cc class 
    // const cssClass = newTask.done ? if true : if false;
    const cssClass = task.done ? "task-title task-title--done" : "task-title";

    // формируем разметку для новой задачи 
    const taskHTML = `<li id="${task.id}" class="list-group-item li__container flex">
                        <div class="li__container__info task_title">
                            <span class="${cssClass}">${task.text}</span>
                        </div>
                        <div class="li__container_btn flex">
                            <span class="li__status">${task.done}</span>
                            <button class="btn btn-outline-success btn-sm btn-action" type="button" data-action="done">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-circle" viewBox="0 0 16 16">
                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
                          </svg>
                            </button>
                            <button class="btn btn-outline-danger btn-sm btn-action" type="button" data-action="delete">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
  <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
</svg>
                            </button>
                        </div>
                    </li>`;

    // Добавим li
    taskList.insertAdjacentHTML('beforeend', taskHTML);

});

checkEmptyList()

form.addEventListener('submit', addTask);
taskList.addEventListener('click', deleteTask);
taskList.addEventListener('click', doneTask);


// Функция добавления задачи
function addTask(event) {
    // отменяем отпрвку формы
    event.preventDefault();

    // достаем текст из input
    const taskText = taskInput.value;

    // Описали объект для задачи
    const newTask = {
        id: Date.now(),
        text: taskText,
        done: false,
    }

    // Добавляем объект в массив
    tasks.push(newTask);
    console.log(tasks);

    // Формируем cc class 
    // const cssClass = newTask.done ? if true : if false;
    const cssClass = newTask.done ? "task-title task-title--done" : "task-title";

    // формируем разметку для новой задачи 
    const taskHTML = `<li id="${newTask.id}" class="list-group-item li__container flex">
                        <div class="li__container__info task_title">
                            <span class="${cssClass}">${newTask.text}</span>
                        </div>
                        <div class="li__container_btn flex">
                            <span class="li__status">${newTask.done}</span>
                            <button class="btn btn-outline-success btn-sm btn-action" type="button" data-action="done">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-circle" viewBox="0 0 16 16">
                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
                          </svg>
                            </button>
                            <button class="btn btn-outline-danger btn-sm btn-action" type="button" data-action="delete">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
  <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
</svg>
                            </button>
                        </div>
                    </li>`;

    // Добавим li
    taskList.insertAdjacentHTML('beforeend', taskHTML);

    // Очищаем input
    taskInput.value = "";
    taskInput.focus();

    checkEmptyList();
    // доавляем в хранилеще
    saveToLocalstorage();
}

// Функция удаления
function deleteTask(event) {
    //  Проверяем если клик был не по кнопке "удалить задачу"
    if (event.target.dataset.action !== 'delete') return;

    // Проверяем.Если в списке 1-н элемень показыве "блок данные отстувуют"
    const parentNode = event.target.closest('.list-group-item');

    // Определить Id задачи
    const id = Number(parentNode.id);
    console.log("Удаляем запись с ", id);

    // Удаляем задачу через фильрацию массива 
    tasks = tasks.filter((task) => task.id !== id)

    // Удаляем из разметки
    parentNode.remove();

    checkEmptyList();

    console.clear();
    console.log(tasks);

    // Удаляем задачу
    saveToLocalstorage();



}

// Функция выполенной задачи
function doneTask(event) {
    if (event.target.dataset.action !== 'done') return;
    const parentNode = event.target.closest('.list-group-item');

    // Опреедление id задачи
    const id = Number(parentNode.id);
    const task = tasks.find(function(task){
        if( task.id === id){
            return true
        }
    })
    task.done = !task.done;
    // обновление страницы чтобы увидеть измнения 
    location.reload();

    console.log(task);

    const taskTitle = parentNode.querySelector('.task-title');
    taskTitle.classList.toggle('done');
    // Сохраняем в localstorage
    saveToLocalstorage();

}
// Функция проверяет и отражение пустоту массива и тражает вставку разметку
function checkEmptyList() {

    if (tasks.length === 0) {
        const emptyListHTML = `<li id="emptyList" class="emtylist">
                                <span class="li__conteiner__info">
                                <<< данные отсутсвуют>>>
                                </span>
                                </li>`
        taskList.insertAdjacentHTML('afterbegin', emptyListHTML);
    }
    if (tasks.length > 0) {
        const emptyListEl = document.querySelector('#emptyList');
        emptyListEl ? emptyListEl.remove() : null;
    }
}

function saveToLocalstorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}