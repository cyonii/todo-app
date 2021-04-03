import _ from 'lodash';
import { randomID } from '../utils/utils';

export default class ToDo {
  constructor(props) {
    this.title = props.title;
    this.id = props.id ? props.id : randomID();
    this.projectId = props.projectId;
    this.description = props.description;
    this.dueDate = props.dueDate;
    this.priority = props.priority;
    this.notes = props.notes;
    this.completed = props.completed ? props.completed : false;
  }

  isValid() {
    const truthy = (value) => Boolean(value);
    return Object.values(_.omit(this, ['completed', 'notes'])).every(truthy);
  }

  save() {
    if (this.isValid()) {
      const storedTodos = ToDo.getAll();
      storedTodos.push(this);
      localStorage.setItem('todos', JSON.stringify(storedTodos));
      return true;
    }
    return false;
  }

  static getAllByProject(projectId) {
    const filteredTodo = ToDo.getAll().filter((todo) => todo.projectId === projectId);
    return filteredTodo.map((data) => new ToDo(data));
  }

  static getAll() {
    const partialData = JSON.parse(localStorage.getItem('todos'));

    return partialData ? partialData.map((data) => new ToDo(data)) : [];
  }
}
