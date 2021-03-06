import { format } from 'date-fns';
import { Modal } from 'bootstrap';
import { setAttributes } from '../utils/utils';
import Task from '../models/task';
import makeTaskForm from './taskForm';

export default function (task) {
  function makeCardWrapper() {
    const el = document.createElement('div');
    el.setAttribute('data-task', task.id);

    el.classList.add('card', 'task-card', 'border-primary', 'overflow-hidden', 'shadow-sm', 'mb-3');
    return el;
  }

  function makeCardHeader() {
    const el = document.createElement('div');

    el.classList.add('card-header', 'border-0', 'p-0');
    return el;
  }

  function makeCollapseToggler() {
    const el = document.createElement('button');
    el.classList.add(
      'btn',
      'alert-dark',
      'd-flex',
      'align-items-start',
      'justify-content-between',
      'w-100',
      'text-start',
      'fw-light',
      'rounded-0',
      'border-0',
    );
    setAttributes(el, {
      'data-bs-toggle': 'collapse',
      'data-bs-target': `#${task.id}`,
    });
    el.innerText = task.title;
    return el;
  }

  function makeDateBadge() {
    const el = document.createElement('div');

    el.classList.add('badge', 'bg-secondary');
    el.innerText = format(task.dueDate, 'dd-MM-yyyy');
    return el;
  }

  function makeCollapsible() {
    const el = document.createElement('div');

    el.classList.add('collapse');
    el.id = task.id;
    return el;
  }

  function makeCardBody() {
    const el = document.createElement('div');

    el.classList.add('card-body', 'rounded-bottom');
    return el;
  }

  function makeTaskDesc() {
    const el = document.createElement('p');

    el.classList.add('card-text', 'mb-0', 'lh-2', 'fw-light', 'text-primary');
    el.innerText = task.description;
    return el;
  }

  function makeTaskNotes() {
    const el = document.createElement('div');

    el.classList.add('alert', 'alert-secondary', 'task-notes');
    el.innerText = task.notes;
    return el;
  }

  function makeCardFooter() {
    const el = document.createElement('div');

    el.classList.add('card-footer', 'py-1', 'd-flex', 'align-items-center');
    return el;
  }

  function makeDeleteButton() {
    const el = document.createElement('button');

    el.innerHTML = "<i class='bi bi-trash-fill'></i>";
    el.classList.add('btn', 'text-danger', 'task-action');
    el.setAttribute('data-task-delete', task.id);
    el.onclick = () => {
      (() => Task.get(task.id).delete())();
      document.querySelector(`[data-task=${task.id}]`).remove();
    };
    return el;
  }

  function editHandler() {
    const modalEl = document.getElementById('taskModal');
    const taskModal = new Modal(modalEl);
    const modalBody = modalEl.querySelector('.modal-body');
    const taskForm = makeTaskForm(task);

    taskForm.onsubmit = (event) => {
      event.preventDefault();
      const newTask = Task.createFromFormData(new FormData(event.currentTarget));
      if (newTask.isValid()) {
        const allTasks = Task.getAll();
        const toReplace = allTasks.find((t) => t.id === newTask.id);

        allTasks[allTasks.indexOf(toReplace)] = newTask;
        localStorage.setItem('tasks', JSON.stringify(allTasks));
        taskForm.reset();
        taskModal.hide();
        window.location.reload();
      }
    };

    modalBody.appendChild(taskForm);
    taskModal.show();
  }

  function makeEditButton() {
    const el = document.createElement('div');

    el.innerHTML = "<i class='bi bi-pen-fill'></i>";
    el.classList.add('btn', 'text-primary', 'task-action');
    el.setAttribute('data-task-edit', task.id);
    el.onclick = editHandler;
    return el;
  }

  function makePriorityBadge() {
    const el = document.createElement('div');

    el.innerText = task.priority;
    el.classList.add('badge', 'alert-dark', 'ms-auto');
    return el;
  }

  return (() => {
    const card = makeCardWrapper();
    const cardHeader = makeCardHeader();
    const toggler = makeCollapseToggler();
    const badge = makeDateBadge();
    const collapsible = makeCollapsible();
    const cardBody = makeCardBody();
    const cardFooter = makeCardFooter();
    const deleteButton = makeDeleteButton();
    const editButton = makeEditButton();

    toggler.appendChild(badge);
    cardHeader.appendChild(toggler);
    cardBody.appendChild(makeTaskDesc());
    cardBody.appendChild(makeTaskNotes());
    cardFooter.appendChild(deleteButton);
    cardFooter.appendChild(editButton);
    cardFooter.appendChild(makePriorityBadge());
    collapsible.appendChild(cardBody);
    collapsible.appendChild(cardFooter);
    card.appendChild(cardHeader);
    card.appendChild(collapsible);

    return card;
  })();
}
