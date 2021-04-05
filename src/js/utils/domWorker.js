import makeTodoCard from '../components/todoCard';
import makeProjectTab from '../components/projectTab';

export default (() => {
  const getActiveTab = () => document.querySelector('#project-stack .nav-link.active');
  const getProjectForm = () => document.getElementById('projectForm');
  const getProjectNavs = () => document.querySelectorAll('#project-stack .nav-link');
  const getProjectStack = () => document.getElementById('project-stack');
  const getTodoForm = () => document.getElementById('todoForm');
  const getTodoModal = () => document.getElementById('todoModal');
  const getTodoPane = () => document.getElementById('todo-stack');

  function appendTodo(todo) {
    const todoPane = getTodoPane();

    todoPane.appendChild(makeTodoCard(todo));
    if (todoPane.firstElementChild.tagName === 'P') todoPane.firstElementChild.remove();
  }

  function updateTodoPane(todos = []) {
    const todoPane = getTodoPane();

    todoPane.innerHTML = '';
    if (todos.length) {
      todos.forEach((todo) => appendTodo(todo));
    } else {
      const message = document.createElement('p');
      message.textContent = 'No Tasks';
      message.classList.add('display-4', 'text-center', 'mt-5', 'text-muted');
      todoPane.appendChild(message);
    }
  }

  function setActiveTab(project, todos) {
    const newActiveTab = document.getElementById(project.id);

    getActiveTab().classList.remove('active');
    newActiveTab.classList.add('active');
    updateTodoPane(todos);
  }

  function appendProject(project) {
    const projectNav = makeProjectTab(project);

    if (project.name.match(/general/i)) projectNav.classList.add('active');

    projectNav.onclick = updateTodoPane.bind(this, project.getOwnTasks());
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
