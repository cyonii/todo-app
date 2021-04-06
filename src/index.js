import './index.html';
import './scss/bundle.scss';
import { Modal } from 'bootstrap';
import Project from './js/models/project';
import Task from './js/models/task';
import domWorker from './js/utils/domWorker';

const projectForm = domWorker.getProjectForm();
const taskForm = domWorker.getTaskForm();
const storageClear = document.getElementById('storageClear');

// Always add Default project if it's unavailable
if (localStorage.length < 1) {
  const defaultProject = Project.createDefaultProject();
  const newTask = Task.createWelcomeTask(defaultProject.id);

  if (defaultProject.save()) domWorker.appendProject(defaultProject);
  if (newTask.save()) domWorker.appendTask(newTask);
} else {
  Project.getAll().forEach((project) => domWorker.appendProject(project));
  domWorker.loadTasks(Project.get(domWorker.getActiveTab().id));
}

projectForm.onsubmit = (event) => {
  event.preventDefault();
  const formData = new FormData(event.currentTarget);
  const newProject = new Project({ name: formData.get('name') });

  if (newProject.save()) {
    domWorker.appendProject(newProject);
    domWorker.setActiveTab(newProject, []);
    domWorker.loadTasks(newProject);
  }
  event.currentTarget.reset();
};

taskForm.onsubmit = (event) => {
  event.preventDefault();
  const formData = new FormData(event.currentTarget);
  const task = Task.createFromFormData(formData);

  task.projectId = domWorker.getActiveTab().id;
  if (task.save()) {
    domWorker.appendTask(task);
    taskForm.reset();
    Modal.getInstance(domWorker.getTaskModal()).hide();
  }
};

// Clear local storage
storageClear.onclick = () => {
  localStorage.clear();
  window.location.reload();
};
