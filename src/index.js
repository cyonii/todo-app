import './index.html';
import './scss/bundle.scss';
import { Modal } from 'bootstrap';
import makeTaskForm from './js/components/taskForm';
import Project from './js/models/project';
import Task from './js/models/task';
import domWorker from './js/utils/domWorker';

const storageClear = document.getElementById('storageClear');
const newTaskButton = document.getElementById('addNewTask');
const {
  appendProject,
  appendTask,
  getProjectForm,
  getActiveTab,
  getTaskForm,
  getTaskModal,
  loadTasks,
  setActiveTab,
} = domWorker;

// Always add Default project if it's unavailable
if (localStorage.length < 1) {
  const defaultProject = Project.createDefault();
  const newTask = Task.createDefault(defaultProject.id);

  if (defaultProject.save()) appendProject(defaultProject);
  if (newTask.save()) appendTask(newTask);
} else {
  Project.getAll().forEach((project) => appendProject(project));
  loadTasks(Project.get(getActiveTab().id));
}

getProjectForm().onsubmit = (event) => {
  event.preventDefault();
  const formData = new FormData(event.currentTarget);
  const newProject = new Project({ name: formData.get('name') });

  if (newProject.save()) {
    appendProject(newProject);
    setActiveTab(newProject, []);
    loadTasks(newProject);
  }
  event.currentTarget.reset();
};

// Display empty form for new task
newTaskButton.onclick = () => {
  const taskModal = new Modal(getTaskModal());
  const modalBody = getTaskModal().querySelector('.modal-body');

  modalBody.appendChild(makeTaskForm());
  taskModal.show();

  getTaskForm().onsubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const task = new Task({
      id: formData.get('id'),
      title: formData.get('title'),
      projectId: formData.get('projectId'),
      description: formData.get('description'),
      dueDate: formData.get('dueDate'),
      priority: formData.get('priority'),
      notes: formData.get('notes'),
    });
    const taskModal = Modal.getInstance(getTaskModal());

    task.projectId = getActiveTab().id;
    if (task.save()) {
      appendTask(task);
      getTaskForm().reset();
      taskModal.hide();
    }
  };
};

// When task modal is hid
getTaskModal().addEventListener('hide.bs.modal', () => getTaskForm().remove());

// Clear local storage
storageClear.onclick = () => {
  localStorage.clear();
  window.location.reload();
};

document.querySelector('.navbar-brand').onclick = (event) => {
  event.preventDefault();
  window.location.reload();
};
