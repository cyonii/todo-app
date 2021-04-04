'use strict';

import './index.html';
import './scss/bundle.scss';
import { Modal } from 'bootstrap';
import Project from './js/models/project';
import ToDo from './js/models/todo';
import domWorker from './js/utils/domWorker';

const projectForm = domWorker.getProjectForm();
const todoForm = domWorker.getTodoForm();
const storageClear = document.getElementById('storageClear');

// Always add Default project if it's unavailable
if (localStorage.length < 1) {
  const defaultProject = Project.createDefaultProject();
  const newTodo = ToDo.createWelcomeTodo(defaultProject.id);

  if (defaultProject.save()) domWorker.appendProject(defaultProject);
  if (newTodo.save()) domWorker.appendTodo(newTodo);
} else {
  Project.getAll().forEach((project) => domWorker.appendProject(project));
  domWorker.updateTodoPane();
}

projectForm.onsubmit = (event) => {
  event.preventDefault();
  const formData = new FormData(event.currentTarget);
  const newProject = new Project({ name: formData.get('name') });

  if (newProject.save()) {
    domWorker.appendProject(newProject);
    domWorker.setActiveTab(newProject);
  }
  event.currentTarget.reset();
};

todoForm.onsubmit = (event) => {
  event.preventDefault();
  const formData = new FormData(event.currentTarget);
  const todo = ToDo.createFromFormData(formData);
  if (todo.save()) {
    domWorker.appendTodo(todo);
    todoForm.reset();
    Modal.getInstance(domWorker.getTodoModal()).hide();
  }
};

// Clear local storage
storageClear.onclick = () => {
  localStorage.clear();
  window.location.reload();
};
