import Task from '../../src/js/models/task';
import Project from '../../src/js/models/project';
import { IDPattern, fakerTaskData } from '../testData';

describe(Task, () => {
  let validTask = null;
  let defaultProject = null;

  beforeEach(() => {
    localStorage.clear();

    defaultProject = Project.createDefault();
    defaultProject.save();
    validTask = new Task({ ...fakerTaskData(), projectId: defaultProject.id });
  });

  describe('constructor', () => {
    it('creates a new Task', () => {
      expect(validTask.id).toMatch(IDPattern);
      expect(validTask instanceof Task).toBe(true);
    });
  });

  describe('\n  ==Instance methods==', () => {
    describe('isValid', () => {
      it('returns false for task without required attributes', () => {
        validTask.projectId = null;
        expect(validTask.isValid()).toBe(false);
      });

      it('returns true for task with required attributes', () => {
        expect(validTask.isValid()).toBe(true);
      });
    });

    describe('save', () => {
      it('saves valid task to localStorage', () => {
        expect(validTask.save()).toBe(true);
        expect(localStorage.tasks).not.toBeUndefined();
        expect(Task.getAll()).toStrictEqual([validTask]);
      });

      it('does not save invalid task to localStorage', () => {
        validTask.title = null;
        expect(validTask.save()).toBe(false);
        expect(Task.getAll()).toStrictEqual([]);
      });
    });

    describe('delete', () => {
      it('deletes task from localStorage', () => {
        validTask.save();
        validTask.delete();

        expect(Task.getAll()).toStrictEqual([]);
      });
    });
  });

  describe('\n  ==Static methods==', () => {
    describe('createDefault', () => {
      it('creates default (welcome) task', () => {
        const task = Task.createDefault(defaultProject.id);

        expect(task.title).toBe('Hello, I am your task manager');
        expect(task.id).toMatch(IDPattern);
        expect(task instanceof Task).toBe(true);
      });
    });

    describe('get', () => {
      it('returns the task with the given ID', () => {
        validTask.save();
        expect(Task.get(validTask.id)).toStrictEqual(validTask);
      });
    });

    describe('getByProject', () => {
      it('returns all tasks saved under the passed project ID', () => {
        for (let i = 0; i < 10; i += 1) {
          new Task({ ...fakerTaskData(), projectId: defaultProject.id }).save();
        }

        const tasks = Task.getByProject(defaultProject.id);
        expect(tasks.length).toEqual(10);
        expect(tasks.every((task) => task.projectId === defaultProject.id)).toBe(true);
      });
    });

    describe('getAll', () => {
      it('returns all tasks saved on localStorage', () => {
        for (let i = 0; i < 15; i += 1) {
          new Task({ ...fakerTaskData(), projectId: defaultProject.id }).save();
        }

        const tasks = Task.getAll();
        expect(tasks.length).toEqual(15);
        expect(tasks.every((task) => task instanceof Task)).toBe(true);
      });
    });
  });
});
