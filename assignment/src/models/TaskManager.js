import { validateTaskInput } from '../utils/validate.js';

export class TaskManager {
  constructor({ store, metrics }) {
    this.store = store;
    this.metrics = metrics;
  }
  
  generateId() {
    const timestamp = Date.now();
    const randomPart = Math.random().toString(36).substr(2, 9);
    return `t_${timestamp}_${randomPart}`;
  }
  
  async addTask(input) {
    validateTaskInput(input);
    
    this.metrics.inc('addTask');
    
    const now = new Date().toISOString();
    const newTask = {
      id: this.generateId(),
      title: input.title.trim(),
      status: input.status || 'open',
      priority: input.priority || 'medium',
      due: input.due || null,
      createdAt: now,
      updatedAt: now
    };
    
    const tasks = await this.store.loadTasks();
    const updatedTasks = [...tasks, newTask];
    await this.store.saveTasks(updatedTasks);
    
    return newTask;
  }
  
  async listTasks(filter = {}) {
    this.metrics.inc('listTasks');
    
    const tasks = await this.store.loadTasks();
    
    if (filter.status) {
      return tasks.filter(task => task.status === filter.status);
    }
    
    return tasks;
  }
  
  async markDone(id) {
    this.metrics.inc('markDone');
    
    const tasks = await this.store.loadTasks();
    
    const taskIndex = tasks.findIndex(task => task.id === id);
    
    if (taskIndex === -1) {
      throw new Error(`Task with id "${id}" not found`);
    }
    
    const updatedTask = {
      ...tasks[taskIndex],
      status: 'done',
      updatedAt: new Date().toISOString()
    };
    
    const updatedTasks = [
      ...tasks.slice(0, taskIndex),
      updatedTask,
      ...tasks.slice(taskIndex + 1)
    ];
    
    await this.store.saveTasks(updatedTasks);
    return updatedTask;
  }
  
  async updateTask(id, patch) {
    validateTaskInput(patch);
    this.metrics.inc('updateTask');
    
    const tasks = await this.store.loadTasks();
    
    const taskIndex = tasks.findIndex(task => task.id === id);
    
    if (taskIndex === -1) {
      throw new Error(`Task with id "${id}" not found`);
    }
    
    const updatedTask = {
      ...tasks[taskIndex],
      ...patch,
      id: tasks[taskIndex].id,
      createdAt: tasks[taskIndex].createdAt,
      updatedAt: new Date().toISOString()
    };
    
    const updatedTasks = [
      ...tasks.slice(0, taskIndex),
      updatedTask,
      ...tasks.slice(taskIndex + 1)
    ];
    
    await this.store.saveTasks(updatedTasks);
    return updatedTask;
  }
  
  async removeTask(id) {
    this.metrics.inc('removeTask');
    
    const tasks = await this.store.loadTasks();
    
    const taskIndex = tasks.findIndex(task => task.id === id);
    
    if (taskIndex === -1) {
      throw new Error(`Task with id "${id}" not found`);
    }
    
    const updatedTasks = [
      ...tasks.slice(0, taskIndex),
      ...tasks.slice(taskIndex + 1)
    ];
    
    await this.store.saveTasks(updatedTasks);
    return tasks[taskIndex];
  }
  
  async stats() {
    this.metrics.inc('stats');
    
    const tasks = await this.store.loadTasks();
    
    const openTasks = tasks.filter(task => task.status === 'open').length;
    const doneTasks = tasks.filter(task => task.status === 'done').length;
    
    const lowTasks = tasks.filter(task => task.priority === 'low').length;
    const mediumTasks = tasks.filter(task => task.priority === 'medium').length;
    const highTasks = tasks.filter(task => task.priority === 'high').length;
    
    const stats = {
      total: tasks.length,
      byStatus: {
        open: openTasks,
        done: doneTasks
      },
      byPriority: {
        low: lowTasks,
        medium: mediumTasks,
        high: highTasks
      },
      actionMetrics: this.metrics.snapshot()
    };
    
    return stats;
  }
}