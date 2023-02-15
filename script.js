const taskInputText = document.querySelector('.textInput');
const tableOfTasks = document.getElementById('tasks');
const addButton = document.getElementById('add');

function createCheckbox() {
    const checkbox = document.createElement('input');
    checkbox.type = "checkbox";
    checkbox.classList.add('checkbox');
    checkbox.addEventListener('click', event => {
        event.preventDefault();
        const parentTableRow = event.target.closest('tr');
        const taskName = parentTableRow.querySelector('.task-name');
        const taskDate = parentTableRow.querySelector('.date-info').querySelector('span');
        const tableData = parentTableRow.querySelector('.buttons-container');
        const editButton = tableData.querySelector('.edit-button');
        if(event.target.checked) {
            taskName.classList.add('completed');
            taskDate.classList.add('completed');
            editButton.style.opacity = 0;
            editButton.disabled = true;
            editButton.style.transition = 'all 0.3s ease-in-out';
            editButton.style.cursor = 'default';
        }
        else {
            taskName.classList.remove('completed');
            taskDate.classList.remove('completed');
            editButton.style.opacity = 1;
            editButton.disabled = false;
            editButton.style.cursor = 'pointer';
        }
    });
    return checkbox;
}

function createSpanTag(taskName, className) {
    const span = document.createElement('span');
    span.classList.add(className);
    span.innerText = taskName;
    return span;
}

// Creates a new td element with enterd task text in it.
function createTaskName(taskName) {
    const tableData = document.createElement('td');
    tableData.appendChild(createCheckbox());
    tableData.appendChild(createSpanTag(taskName, 'task-name'));
    return tableData;
}

function createDeleteButton() {
    const deleteButton = document.createElement('button');
    deleteButton.classList.add('btn')
    deleteButton.classList.add('delete-button')
    
    const deleteIcon = document.createElement('i');
    deleteIcon.classList.add('fa');
    deleteIcon.classList.add('fa-trash');
    deleteButton.appendChild(deleteIcon);
    deleteButton.addEventListener('click', event => {
        const tableRowTobeDeleted = deleteButton.parentElement.parentElement;
        tableRowTobeDeleted.style.opacity = 0;
        tableRowTobeDeleted.remove();
    });

    return deleteButton;
}

function createEditButton() {
    const editButton = document.createElement('button');
    editButton.classList.add('btn')
    editButton.classList.add('edit-button');
    const editIcon = document.createElement('i');
    editIcon.classList.add('fa');
    editIcon.classList.add('fa-edit');
    editButton.appendChild(editIcon);
    editButton.addEventListener('click', event => {
        const tableRowTobeEdited = editButton.parentElement.parentElement;
        editTask(tableRowTobeEdited);
    });

    return editButton;
}

function createInputTag(type, className, value) {
    const inputTag = document.createElement('input');
    if(value != null) {
        inputTag.value = value;
    }
    inputTag.type = type;
    inputTag.classList.add(className);
    return inputTag;
}

function createDateInfo(date, time) {
    const tableData = createTableDataTag('date-info');
    const dateInputEntered = createInputTag('date', 'date', date.value);
    const timeInputEntered = createInputTag('time', 'time', time.value);
    dateInputEntered.setAttribute('readonly', 'true');
    timeInputEntered.setAttribute('readonly', 'true');
    tableData.appendChild(dateInputEntered);
    tableData.appendChild(timeInputEntered);
    return tableData;
}

// Creates a new tr element inside table tag.
function createTaskRow(taskName) {
    const tableRow = createTableRowTag('uncomplete');
    tableRow.appendChild(createTaskName(taskName));
    const date = document.getElementById('date');
    const time = document.getElementById('time');
    tableRow.appendChild(createDateInfo(date, time));

    const tableData = createTableDataTag('buttons-container');
    tableData.appendChild(createEditButton());
    tableData.appendChild(createDeleteButton());
    
    tableRow.appendChild(tableData);
    return tableRow;
}

function createTableDataTag(className) {
    const tableDataTag = document.createElement('td');
    tableDataTag.classList.add(className);
    return tableDataTag;
}

// Creates a new tr tag and sets its class.
function createTableRowTag(className) {
    const tableRowTag = document.createElement('tr');
    tableRowTag.classList.add(className);
    return tableRowTag;
}

addButton.addEventListener('click', event => {
    event.preventDefault();
    if(taskInputText.value === '') {
        alert("The input is empty, enter a text");
    }
    else {
        const taskRow = createTaskRow(taskInputText.value);
       // saveToLocalStorage(taskRow);
        tableOfTasks.appendChild(taskRow);
        taskInputText.value = '';
    }
});

taskInputText.onkeypress = function(event) {
    if(event.key == 'Enter') {
        event.preventDefault();
        if(taskInputText.value === '') {
            alert("The input is empty, enter a text");
        }
        else {
            const taskRow = createTaskRow(taskInputText.value);
            saveToLocalStorage(taskRow);
            tableOfTasks.appendChild(taskRow);
            taskInputText.value = '';
        }
    }
}

function editTask(tableRowTobeEdited) {
    const icon = tableRowTobeEdited.querySelector('.edit-button').querySelector('.fa-edit, .fa-save');
    const checkbox = tableRowTobeEdited.querySelector('input[type="checkbox"]');
    const dateInputEntered = tableRowTobeEdited.querySelector('.date');
    const timeInputEntered = tableRowTobeEdited.querySelector('.time');

    if(icon.classList.contains('fa-edit')) {
        icon.classList.remove('fa-edit');
        icon.classList.add('fa-save');

        const taskToEdit = tableRowTobeEdited.querySelector(".task-name");
        taskToEdit.setAttribute("contenteditable", "true");
        taskToEdit.addEventListener('keydown', function(event) {
            if(event.key === "Enter") {
                event.preventDefault();
            }
        });
        dateInputEntered.removeAttribute("readonly");
        timeInputEntered.removeAttribute("readonly");
        checkbox.disabled = true;
        checkbox.style.opacity = 0;
    } else {
        icon.classList.remove('fa-save');
        icon.classList.add('fa-edit');
        const taskToEdit = tableRowTobeEdited.querySelector(".task-name");
        taskToEdit.setAttribute("contenteditable", "false");
        dateInputEntered.setAttribute('readonly', 'true');
        timeInputEntered.setAttribute('readonly', 'true');
        checkbox.disabled = false;
        checkbox.style.opacity = 1;
    }
}

function saveToLocalStorage(tr) {
    let elements = JSON.parse(localStorage.getItem('taskInfo')) || [];
    
    const taskData = {
        html: tr.innerHTML,
        date: tr.querySelector('.date').value,
        time: tr.querySelector('.time').value
    };

    elements.push(taskData);
    localStorage.setItem('taskInfo', JSON.stringify(elements));
  }

document.addEventListener('DOMContentLoaded', () => {
    // Get the task elements from localStorage
    const taskElements = JSON.parse(localStorage.getItem('taskInfo')) || [];
  
    // Loop through the task elements and create new table rows with the stored HTML code
    const tasksTable = document.querySelector('#tasks');
    taskElements.forEach(taskData => {
      const newElement = document.createElement('tr');
      newElement.innerHTML = taskData.html;
      newElement.querySelector('.date').value = taskData.date;
      newElement.querySelector('.time').value = taskData.time;
      tasksTable.appendChild(newElement);
    });
  });

// Date time Configuration
const dateInput = document.getElementById('date');
const timeInput = document.getElementById('time');
const currentDate = new Date();
const year = currentDate.getFullYear();
const month = String(currentDate.getMonth() + 1).padStart(2, '0');
const day = String(currentDate.getDate()).padStart(2, '0');
const today = `${year}-${month}-${day}`;
const hours = String(currentDate.getHours()).padStart(2, '0');
const minutes = String(currentDate.getMinutes()).padStart(2, '0');
const now = `${hours}:${minutes}`;
timeInput.value = now;
dateInput.value = today;