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
  const getTodoStack = () => document.getElementById('todo-stack');

  function appendTodo(todo) {
    const todoStack = getTodoStack();
    todoStack.appendChild(makeTodoCard(todo));
  }

  function displayOwnTodos() {
    const todos = ToDo.getAllByProject(this.id);
    const todoStack = getTodoStack();

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
  function setActiveTab() {
    getActiveTab().classList.remove('active');
    document.getElementById(project.id).classList.add('active');
    displayOwnTodos.call(project);
  }

  function appendProject(project) {
    const projectNav = makeProjectNav(project);
    if (project.name.match(/general/i)) projectNav.classList.add('active');

    projectNav.onclick = displayOwnTodos.bind(project, []);
    getProjectStack().appendChild(projectNav);
  }

  return {
    appendProject,
    appendTodo,
    displayOwnTodos,
    getProjectForm,
    getActiveTab,
    getProjectNavs,
    getProjectStack,
    getTodoForm,
    getTodoModal,
    setActiveTab,
  };
})();
