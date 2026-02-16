/* eslint-disable no-use-before-define */

const formEl = document.getElementById('todo-form');
const inputEl = document.getElementById('task-input');
const listEl = document.getElementById('todo-list');

const initialTasks = [
  { text: 'First item', done: true },
  { text: 'Second item', done: false },
  { text: 'Third item', done: false },
];

function init() {
  initialTasks.forEach((task) => {
    const li = createTodoItem(task.text, task.done);
    listEl.appendChild(li);
  });

  formEl.addEventListener('submit', handleAdd);
}

function handleAdd(event) {
  event.preventDefault();

  const text = inputEl.value.trim();
  if (!text) {
    inputEl.focus();
    return;
  }

  const li = createTodoItem(text, false);
  listEl.appendChild(li);

  inputEl.value = '';
  inputEl.focus();
}

function createTodoItem(text, isDone) {
  // <li class="list__item">
  const liEl = document.createElement('li');
  liEl.className = 'list__item';

  // checkbox
  const checkboxEl = document.createElement('input');
  checkboxEl.type = 'checkbox';
  checkboxEl.className = 'item__checkbox';
  checkboxEl.checked = Boolean(isDone);

  // text
  const textEl = document.createElement('span');
  textEl.className = 'item__text';
  textEl.textContent = text;

  // delete button
  const deleteBtn = document.createElement('button');
  deleteBtn.type = 'button';
  deleteBtn.className = 'item__delete';
  deleteBtn.setAttribute('aria-label', 'Delete item');
  deleteBtn.textContent = '🗑';

  // events
  checkboxEl.addEventListener('change', () => {
    liEl.classList.toggle('is-done', checkboxEl.checked);
  });

  deleteBtn.addEventListener('click', () => {
    // DOM removeChild required by task
    listEl.removeChild(liEl);
  });

  // append
  liEl.appendChild(checkboxEl);
  liEl.appendChild(textEl);
  liEl.appendChild(deleteBtn);

  // initial style
  if (isDone) {
    liEl.classList.add('is-done');
  }

  return liEl;
}

init();
