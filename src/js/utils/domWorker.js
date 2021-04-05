import makeTaskCard from '../components/taskCard';
import makeProjectTab from '../components/projectTab';
import makeNoTaskNotice from '../components/noTasks';

export default (() => {
  const getActiveTab = () => document.querySelector('#project-stack .nav-link.active');
  const getProjectForm = () => document.getElementById('projectForm');
  const getProjectTabs = () => document.querySelectorAll('#project-stack .nav-link');
  const getProjectStack = () => document.getElementById('project-stack');
  const getTaskForm = () => document.getElementById('taskForm');
  const getTaskModal = () => document.getElementById('taskModal');
  const getTaskPane = () => document.getElementById('task-pane');

  function appendTask(task) {
    const taskPane = getTaskPane();

    taskPane.appendChild(makeTaskCard(task));
    if (!taskPane.firstElementChild.classList.contains('task-card')) {
      taskPane.firstElementChild.remove();
    }
  }

  function updateTaskPane(tasks = []) {
    const taskPane = getTaskPane();

    taskPane.innerHTML = '';
    if (tasks.length) {
      tasks.forEach((task) => appendTask(task));
    } else {
      taskPane.appendChild(makeNoTaskNotice(getActiveTab().id));
    }
  }

  function setActiveTab(project, tasks) {
    const newActiveTab = document.getElementById(project.id);

    getActiveTab().classList.remove('active');
    newActiveTab.classList.add('active');
    updateTaskPane(tasks);
  }

  function appendProject(project) {
    const projectNav = makeProjectTab(project);

    if (project.name.match(/general/i)) projectNav.classList.add('active');

    projectNav.onclick = updateTaskPane.bind(this, project.getOwnTasks());
    getProjectStack().appendChild(projectNav);
  }

  return {
    appendProject,
    appendTask,
    updateTaskPane,
    getProjectForm,
    getActiveTab,
    getProjectTabs,
    getProjectStack,
    getTaskForm,
    getTaskModal,
    setActiveTab,
  };
})();
