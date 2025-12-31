import * as store from './services/taskStore.js';
import { createMetrics } from './services/metrics.js';
import { TaskManager } from './models/TaskManager.js';

export function createTaskApp() {
  const metrics = createMetrics();
  const taskManager = new TaskManager(store, metrics);

  return { taskManager };
}
