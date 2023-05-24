// ******** SELECT ELEMENTS ************

const input = document.getElementById('input');
const submitBtn = document.getElementById('submit-btn');
const article = document.querySelector('.todo-item');
const form = document.querySelector('.item-form');
const alert = document.getElementById('alert');
const formControl = document.querySelector('.form-control');
const itemContainer = document.querySelector('.item-container');
const sectionCenter = document.querySelector('.section-center');
const ul = document.querySelector('.list-container');

showContainer = true;
let list = [];

// ********** EVENT LISTENERS *********

form.addEventListener('submit', addItem);
window.addEventListener('DOMContentLoaded', setUpItems());
// ****** MAKE  ELEMENTS ********


function ToDo(id, value) {
    this.id = id;
    this.value = value;
}
// ******* FUNCTIONS **********


function addItem(e) {
    e.preventDefault();
    const value = input.value // USER INPUT
    const id = new Date().getTime().toString();
    let newToDo = new ToDo(id, value);
    list.push(newToDo);
    if (value) {
        createListItem(id, value);
        addToLS(list);
        setBackToDefault();
        displayAlert('toDo was added to the list', 'success');
    } else {
        displayAlert('Please enter toDo', 'danger');
    }
}

function createListItem(id, value) {
    //  create elements 
    const li = document.createElement('li');
    // const editBtn = document.createElement('button');
    const deleteBtn = document.createElement('button');
    // create classes
    li.classList.add('list-item');
    li.setAttribute('id', id);
    // show item container
    itemContainer.classList.remove('show-container');
    // editBtn.classList.add('edit-btn');
    deleteBtn.classList.add('delete-btn');
    // giving value
    // editBtn.innerHTML = 'edit';
    deleteBtn.innerHTML = 'x';
    li.innerHTML = value;
    ul.appendChild(li);
    // li.appendChild(editBtn);
    li.appendChild(deleteBtn);
    deleteBtn.addEventListener('click', deleteItem);
    if (!document.querySelector('.clear-btn')) {
        const clearList = document.createElement('button');
        clearList.classList.add('clear-btn');
        clearList.innerHTML = 'Clear list';
        formControl.appendChild(clearList);
        clearList.addEventListener('click', clearItems);
    }
}

function setBackToDefault() {
    input.value = '';
}

function displayAlert(text, action) {
    alert.innerHTML = text;
    if (action === 'danger') {
        alert.classList.add('alert-danger');
        setTimeout(() => {
            alert.classList.remove('alert-danger');
        }, 1250);
    } else {
        alert.classList.add('alert-success');
        setTimeout(() => {
            alert.classList.remove('alert-success');
        }, 1250);
    }
}

function deleteItem(e) {
    const element = e.currentTarget.parentElement;
    // remove item
    ul.removeChild(element);
    // remove item from the array list
    list.splice(list.indexOf(element.id), 1);
    displayAlert('toDo was removed', 'success');
    if (ul.childElementCount < 1) {
        itemContainer.classList.add('show-container');
        const element = formControl.lastElementChild;
        formControl.removeChild(element);
        deleteFromLS(e);
    } else {
        deleteFromLS(e);
    }
}

function clearItems(e) {
    e.preventDefault;
    const element = e.currentTarget.parentElement.parentElement.parentElement.lastElementChild.lastElementChild.lastElementChild;
    element.replaceChildren();
    displayAlert('toDo list is clear', 'success');
    itemContainer.classList.add('show-container');
    localStorage.clear();
    list.length = 0;
    if (!document.querySelector('.list-item')) {
        const element = e.currentTarget;
        formControl.removeChild(element);
    }
}



function addToLS(list) {
    localStorage.setItem('list', JSON.stringify(list));
}


function setUpItems() {
    if (localStorage.getItem('list')) {
        const ids = JSON.parse(localStorage.getItem('list'));
        ids.forEach(id => {
            list.push(id);
            createListItem(id.id, id.value);
            // addToLS(list);
        });
    }
}


function deleteFromLS(e) {
    const target = e.currentTarget.parentElement;
    let getLSElement = JSON.parse(localStorage.getItem('list'));
    for (let i = 0; i < getLSElement.length; i++) {
        if (getLSElement[i].id == target.id) {
            getLSElement.splice(i, 1);
            addToLS(getLSElement);
        }
    }
}