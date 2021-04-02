import _ from "lodash";

export default class ToDo {
  constructor(props) {
    this.title = props.title;
    this.projectId = props.projectId;
    this.description = props.description;
    this.dueDate = props.dueDate;
    this.priority = props.priority;
    this.notes = props.notes;
    this.completed = props.completed ? props.completed : false;
  }

  save() {
    const ownProperties = [];
    const storedTodos = ToDo.getAll();

    for (let prop in this) {
      if (this.hasOwnProperty(prop)) ownProperties.push(prop);
    }

    storedTodos.push(_.pick(this, ownProperties));
    localStorage.setItem("todos", JSON.stringify(storedTodos));
  }

  static getAllByProject(projectId) {
    const filteredTodo = ToDo.getAll().filter((todo) => {
      if (todo.projectId == projectId) return todo;
    });
    return filteredTodo.map((data) => new ToDo(data));
  }

  static getAll() {
    const partialData = JSON.parse(localStorage.getItem("todos"));

    return partialData ? partialData.map((data) => new ToDo(data)) : [];
  }
}
