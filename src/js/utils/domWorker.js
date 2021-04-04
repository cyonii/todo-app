import ToDo from '../models/todo';
import makeTodoCard from '../components/todoCard';
import makeProjectNav from '../components/projectNav';

export default (() => {
  const getActiveTab = () => document.querySelector('#project-stack .nav-link.active');
  const getProjectForm = () => document.getElementById('projectForm');
  const getProjectNavs = () => document.querySelectorAll('#project-stack .nav-link');
  const getProjectStack = () => document.getElementById('project-stack');
  const getTodoForm = () => document.getElementById('todoForm');
  const getTodoModal = () => document.getElementById('todoModal');
  const getTodoPane = () => document.getElementById('todo-stack');

  function appendTodo(todo) {
    const todoStack = getTodoPane();

    todoStack.appendChild(makeTodoCard(todo));
    if (todoStack.firstElementChild.tagName === 'P') todoStack.firstElementChild.remove();
  }

  function updateTodoPane() {
    const todos = ToDo.getAllByProject(getActiveTab().id);
    const todoStack = getTodoPane();

    todoStack.innerHTML = '';
    if (todos.length) {
      todos.forEach((todo) => appendTodo(todo));
    } else {
      const message = document.createElement('p');
      message.textContent = 'No Tasks';
      message.classList.add('display-4', 'text-center', 'mt-5', 'text-muted');
      todoStack.appendChild(message);
    }
  }

  function setActiveTab(project) {
    const newActiveTab = document.getElementById(project.id);

    getActiveTab().classList.remove('active');
    newActiveTab.classList.add('active');
    updateTodoPane();
  }

  function appendProject(project) {
    const projectNav = makeProjectNav(project);
    if (project.name.match(/general/i)) projectNav.classList.add('active');

    projectNav.onclick = updateTodoPane;
    getProjectStack().appendChild(projectNav);
  }

  return {
    appendProject,
    appendTodo,
    updateTodoPane,
    getProjectForm,
    getActiveTab,
    getProjectNavs,
    getProjectStack,
    getTodoForm,
    getTodoModal,
    setActiveTab,
  };
})();
