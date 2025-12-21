import { TaskManager } from './models/TaskManager.js';
import * as taskStore from './services/taskStore.js';
import { createMetrics } from './services/metrics.js';

export function createTaskApp() {
  const metrics = createMetrics();
  
  const store = {
    loadTasks: taskStore.loadTasks,
    saveTasks: taskStore.saveTasks
  };
  
  const taskManager = new TaskManager({ store, metrics });
  
  return {
    taskManager
  };
}

export { formatTask } from './utils/format.js';