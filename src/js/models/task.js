import _ from 'lodash';
import { randomID } from '../utils/utils';

export default class Task {
  constructor(props) {
    this.title = props.title;
    this.id = props.id ? props.id : randomID();
    this.projectId = props.projectId;
    this.description = props.description;
    this.dueDate = new Date(props.dueDate);
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
      const storedTasks = Task.getAll();
      storedTasks.push(this);
      localStorage.setItem('tasks', JSON.stringify(storedTasks));
      return true;
    }
    return false;
  }

  delete() {
    const allTasks = Task.getAll();

    allTasks.splice(allTasks.indexOf(this), 1);
    localStorage.setItem('tasks', JSON.stringify(allTasks));
  }

  static createWelcomeTask(projectId) {
    return new Task({
      title: 'Hello, I am your task manager',
      projectId,
      description: 'I will help you organize your plans',
      dueDate: new Date(),
      priority: 'low',
      notes: 'You can delete me when you want',
    });
  }

  static createFromFormData(formData) {
    return new Task({
      title: formData.get('title'),
      projectId: formData.get('projectId'),
      description: formData.get('description'),
      dueDate: formData.get('dueDate'),
      priority: formData.get('priority'),
      notes: formData.get('notes'),
    });
  }

  static get(id) {
    return Task.getAll().find((task) => task.id === id);
  }

  static getAllByProject(projectId) {
    return Task.getAll().filter((task) => task.projectId === projectId);
  }

  static getAll() {
    const partial = JSON.parse(localStorage.getItem('tasks')) || [];
    return partial.map((data) => new Task(data));
  }
}
