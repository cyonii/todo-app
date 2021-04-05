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

  delete() {
    const allTodos = ToDo.getAll();

    allTodos.splice(allTodos.indexOf(this), 1);
    localStorage.setItem('todos', JSON.stringify(allTodos));
  }

  static createWelcomeTodo(projectId) {
    return new ToDo({
      title: 'Hello, I am your task manager',
      projectId,
      description: 'I will help you organize your plans',
      dueDate: new Date(),
      priority: 'low',
      notes: 'You can delete me when you want',
    });
  }

  static createFromFormData(formData) {
    return new ToDo({
      title: formData.get('title'),
      projectId: formData.get('projectId'),
      description: formData.get('description'),
      dueDate: formData.get('dueDate'),
      priority: formData.get('priority'),
      notes: formData.get('notes'),
    });
  }

  static get(id) {
    return ToDo.getAll().find((todo) => todo.id === id);
  }

  static getAllByProject(projectId) {
    return ToDo.getAll().filter((todo) => todo.projectId === projectId);
  }

  static getAll() {
    const partial = JSON.parse(localStorage.getItem('todos')) || [];
    return partial.map((data) => new ToDo(data));
  }
}
