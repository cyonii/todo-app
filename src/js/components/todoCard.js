import { format } from 'date-fns';
import { setAttributes } from '../utils/utils';

export default function (todo) {
  function makeCardWrapper() {
    const el = document.createElement('div');
    el.setAttribute('data-todo', todo.id);

    el.classList.add('card', 'todo-card', 'border-primary', 'overflow-hidden', 'shadow-sm', 'mb-3');
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
      'data-bs-target': `#${todo.id}`,
    });
    el.innerText = todo.title;
    return el;
  }

  function makeDateBadge() {
    const el = document.createElement('div');

    el.classList.add('badge', 'bg-secondary');
    el.innerText = format(new Date(todo.dueDate), 'dd-mm-yyyy');
    return el;
  }

  function makeCollapsible() {
    const el = document.createElement('div');

    el.classList.add('collapse');
    el.id = todo.id;
    return el;
  }

  function makeCardBody() {
    const el = document.createElement('div');

    el.classList.add('card-body', 'rounded-bottom');
    return el;
  }

  function makeTodoDesc() {
    const el = document.createElement('p');

    el.classList.add('card-text', 'mb-0', 'text-primary');
    el.innerText = todo.description;
    return el;
  }

  function makeTodoNotes() {
    const el = document.createElement('div');

    el.classList.add('alert', 'alert-secondary', 'todo-notes');
    el.innerText = todo.notes;
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
    el.classList.add('btn', 'text-danger', 'todo-action');
    el.setAttribute('data-todo', todo.id);
    // el.onclick = deleteTask;
    return el;
  }

  function makeEditButton() {
    const el = document.createElement('div');
    el.innerHTML = "<i class='bi bi-pen-fill'></i>";
    el.classList.add('btn', 'text-primary', 'todo-action');
    return el;
  }

  function makeStatusChecker() {
    const el = document.createElement('input');
    el.classList.add('form-check-input', 'todo-actions', 'ms-auto');
    el.id = 'updateStatus';
    el.setAttribute('type', 'checkbox');
    if (todo.completed) el.setAttribute('checked', true);
    return el;
  }

  function makeTodoCard() {
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
    cardBody.appendChild(makeTodoDesc());
    cardBody.appendChild(makeTodoNotes());
    cardFooter.appendChild(deleteButton);
    cardFooter.appendChild(editButton);
    cardFooter.appendChild(makeStatusChecker());
    collapsible.appendChild(cardBody);
    collapsible.appendChild(cardFooter);
    card.appendChild(cardHeader);
    card.appendChild(collapsible);

    return card;
  }

  return makeTodoCard();
}
