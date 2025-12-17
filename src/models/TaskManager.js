import { validateTaskInput } from '../utils/validate.js';

export class TaskManager {
  constructor(store, metrics) {
    this.store = store;
    this.metrics = metrics;
  }

  async addTask(input) {
    validateTaskInput(input);
    const tasks = await this.listTasks(); // reusing listTasks to get current state effectively or loadTasks()
    
    const newTask = {
      id: `t_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
      title: input.title,
      status: 'open',
      priority: input.priority || 'medium', 
      due: input.due || null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    await this.store.saveTasks([...tasks, newTask]);
    this.metrics.inc('addTask');
    return newTask;
  }

  async listTasks(filter = {}) {
    const tasks = await this.store.loadTasks();
    this.metrics.inc('listTasks');
    
    return tasks.filter(task => {
      return !filter.status || task.status === filter.status;
    });
  }

  async markDone(id) {
    await this.updateTask(id, { status: 'done' });
    this.metrics.inc('markDone'); 
  }

  async updateTask(id, patch) {
    const tasks = await this.store.loadTasks();
    const index = tasks.findIndex(t => t.id === id);
    if (index === -1) throw new Error(`Task with ID ${id} not found.`);

    tasks[index] = { ...tasks[index], ...patch, updatedAt: new Date().toISOString() }; // Object spread for Immutability of item
    
    await this.store.saveTasks(tasks);
    this.metrics.inc('updateTask');
    return tasks[index];
  }

  async removeTask(id) {
    const tasks = await this.store.loadTasks();
    const newTasks = tasks.filter(t => t.id !== id);
    if (newTasks.length === tasks.length) throw new Error(`Task with ID ${id} not found.`);
    
    await this.store.saveTasks(newTasks);
    this.metrics.inc('removeTask');
  }

  async stats() {
    const tasks = await this.store.loadTasks();
    this.metrics.inc('stats');

    const initialState = { total: 0, open: 0, done: 0, byPriority: { low: 0, medium: 0, high: 0 } };
    
    const data = tasks.reduce((acc, task) => {
      acc.total++;
      if (task.status === 'open') acc.open++;
      if (task.status === 'done') acc.done++;
      if (acc.byPriority[task.priority] !== undefined) acc.byPriority[task.priority]++;
      return acc;
    }, initialState);

    return { ...data, metrics: this.metrics.snapshot() };
  }
}
