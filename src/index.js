import './index.html';
import './scss/bundle.scss';
import { Modal } from 'bootstrap';
import Project from './js/models/project';
import ToDo from './js/models/todo';
import domWorker from './js/utils/domWorker';

const projectForm = domWorker.getProjectForm();
const todoForm = domWorker.getTodoForm();
const storageClear = document.getElementById('storageClear');

// Always add General project if it's unavailable
if (localStorage.length < 1) {
  const generalProject = new Project({ name: 'General' });
  const newTodo = new ToDo({
    title: 'Hello, I am your task manager',
    projectId: generalProject.id,
    description: 'I will help you organize your plan',
    dueDate: new Date(),
    priority: 'low',
    notes: 'You can delete me when you want',
  });

  if (generalProject.save()) domWorker.appendProject(generalProject);
  if (newTodo.save()) domWorker.appendTodo(newTodo);
} else {
  Project.getAll().forEach((project) => domWorker.appendProject(project));
  ToDo.getAllByProject(domWorker.getActiveTab().id).forEach((todo) => domWorker.appendTodo(todo));
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
  const todo = new ToDo({
    title: formData.get('title'),
    projectId: domWorker.getActiveTab().id,
    description: formData.get('description'),
    dueDate: formData.get('dueDate'),
    priority: formData.get('priority'),
    notes: formData.get('notes'),
  });
  if (todo.save()) {
    domWorker.appendTodo(todo);
    todoForm.reset();
    Modal.getInstance(domWorker.getTodoModal()).hide();
  }
};

// Clear local storage
storageClear.onclick = (event) => {
  localStorage.clear();
  console.log(document.querySelector('.navbar-brand').href);
  window.location.reload();
};
