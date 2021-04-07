import { format } from 'date-fns';
import { setAttributes } from '../utils/utils';

export default function (task = {}) {
  function makeFormWrapper() {
    const el = document.createElement('form');
    el.id = 'taskForm';
    return el;
  }

  function makeTitleInput() {
    const wrapper = document.createElement('div', { name: 'js' });
    const input = document.createElement('input');
    const label = document.createElement('label');

    wrapper.classList.add('form-floating', 'mb-3');
    input.id = 'title';
    input.value = task.title ? task.title : '';
    input.classList.add('form-control');
    label.textContent = 'Title';
    setAttributes(input, {
      type: 'text',
      name: 'title',
      required: true,
      placeholder: 'Task title',
    });
    setAttributes(label, { for: 'title' });

    wrapper.appendChild(input);
    wrapper.appendChild(label);

    return wrapper;
  }

  function makeDescriptionInput() {
    const wrapper = document.createElement('div');
    const textarea = document.createElement('textarea');
    const label = document.createElement('label');

    wrapper.classList.add('form-floating', 'mb-3');
    textarea.id = 'description';
    textarea.value = task.description ? task.description : '';
    textarea.classList.add('form-control');
    label.textContent = 'Description';
    setAttributes(textarea, {
      name: 'description',
      required: true,
      placeholder: 'What is this task about?',
    });
    setAttributes(label, { for: 'description' });

    wrapper.appendChild(textarea);
    wrapper.appendChild(label);

    return wrapper;
  }

  function makeDateInput() {
    const wrapper = document.createElement('div');
    const input = document.createElement('input');
    const label = document.createElement('label');

    wrapper.classList.add('form-floating', 'col-6', 'mb-3');
    input.id = 'dueDate';
    input.value = task.dueDate ? format(task.dueDate, 'yyyy-MM-dd') : '';
    input.classList.add('form-select');
    label.textContent = 'Due Date';
    setAttributes(input, {
      type: 'date',
      name: 'dueDate',
      required: true,
    });
    setAttributes(label, { for: 'dueDate' });

    wrapper.appendChild(input);
    wrapper.appendChild(label);

    return wrapper;
  }

  function makePriorityInput() {
    const wrapper = document.createElement('div');
    const select = document.createElement('select');
    const label = document.createElement('label');
    const priorities = ['low', 'mid', 'high'];

    priorities.forEach((priority) => {
      const option = document.createElement('option');
      option.value = priority;
      option.innerText = priority;
      if (priority === task.priority) setAttributes(option, { selected: true });
      select.appendChild(option);
    });

    wrapper.classList.add('form-floating', 'col-6', 'mb-3');
    select.id = 'priority';
    select.classList.add('form-select');
    label.textContent = 'Priority';
    setAttributes(select, {
      type: 'date',
      name: 'priority',
      required: true,
    });
    setAttributes(label, { for: 'priority' });

    wrapper.appendChild(select);
    wrapper.appendChild(label);

    return wrapper;
  }

  function makeNotesInput() {
    const wrapper = document.createElement('div');
    const textarea = document.createElement('textarea');
    const label = document.createElement('label');

    wrapper.classList.add('form-floating', 'mb-3');
    textarea.id = 'notes';
    textarea.value = task.notes ? task.notes : '';
    textarea.classList.add('form-control');
    label.textContent = 'Notes';
    setAttributes(textarea, {
      name: 'notes',
      placeholder: 'Do you have any notes about this task?',
    });
    setAttributes(label, { for: 'notes' });

    wrapper.appendChild(textarea);
    wrapper.appendChild(label);

    return wrapper;
  }

  function makeSubmitButton() {
    const button = document.createElement('button');

    button.innerText = 'Add task';
    button.classList.add('btn', 'btn-primary');
    setAttributes(button, { type: 'submit' });

    return button;
  }

  return (() => {
    const form = makeFormWrapper();
    const id = document.createElement('input');
    const proejectId = document.createElement('input');

    id.name = 'id';
    id.value = task.id;
    setAttributes(id, { hidden: true });
    proejectId.name = 'projectId';
    proejectId.value = task.projectId;
    setAttributes(proejectId, { hidden: true });

    form.appendChild(makeTitleInput());
    form.appendChild(makeDescriptionInput());
    form.appendChild(document.createElement('div'));
    form.lastElementChild.classList.add('row', 'gx-1');
    form.lastElementChild.appendChild(makeDateInput());
    form.lastElementChild.appendChild(makePriorityInput());
    form.appendChild(makeNotesInput());
    form.appendChild(proejectId);
    form.appendChild(id);
    form.appendChild(makeSubmitButton());

    return form;
  })();
}
