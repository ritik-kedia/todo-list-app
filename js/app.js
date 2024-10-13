const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const dateInput = document.getElementById('date-input');
const taskList = document.getElementById('task-list');


taskForm.addEventListener('submit', function (e) {
    e.preventDefault(); 

    const taskText = taskInput.value.trim();
    const taskDate = dateInput.value;

    if (taskText !== '' && taskDate !== '') {
        addTask(taskText, taskDate);
        saveTasks();
    } else {
        alert('Please enter a task and select a date.');
    }

    taskInput.value = '';
    dateInput.value = '';
});


function addTask(text, date) {
    const li = document.createElement('li');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.addEventListener('click', toggleTaskStatus);

    const spanText = document.createElement('span');
    spanText.textContent = `${text} (Due: ${date})`;

    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.classList.add('edit');
    editBtn.addEventListener('click', function () {
        editTask(li, spanText);
    });

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('delete');
    deleteBtn.addEventListener('click', function () {
        taskList.removeChild(li);
        saveTasks();
    });

    li.appendChild(checkbox);
    li.appendChild(spanText);
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
}


function toggleTaskStatus() {
    const listItem = this.parentElement;
    listItem.classList.toggle('completed');
    saveTasks();
}


function editTask(li, spanText) {
    const newText = prompt('Edit your task:', spanText.textContent.split(' (Due: ')[0]);
    if (newText) {
        const newDate = prompt('Edit due date:', li.querySelector('span').textContent.split(' (Due: ')[1].slice(0, -1));
        spanText.textContent = `${newText} (Due: ${newDate})`;
        saveTasks();
    }
}


function saveTasks() {
    const tasks = [];
    taskList.querySelectorAll('li').forEach(function (li) {
        const taskText = li.querySelector('span').textContent;
        const isCompleted = li.classList.contains('completed');
        tasks.push({ taskText, isCompleted });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}


function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(function (task) {
        const li = document.createElement('li');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.isCompleted;
        checkbox.addEventListener('click', toggleTaskStatus);

        const spanText = document.createElement('span');
        spanText.textContent = task.taskText;

        if (task.isCompleted) {
            li.classList.add('completed');
        }

        const editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';
        editBtn.classList.add('edit');
        editBtn.addEventListener('click', function () {
            editTask(li, spanText);
        });

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.classList.add('delete');
        deleteBtn.addEventListener('click', function () {
            taskList.removeChild(li);
            saveTasks();
        });

        li.appendChild(checkbox);
        li.appendChild(spanText);
        li.appendChild(editBtn);
        li.appendChild(deleteBtn);
        taskList.appendChild(li);
    });
}

loadTasks();
