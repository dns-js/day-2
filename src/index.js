import * as store from './services/taskStore.js';
import { createMetrics } from './services/metrics.js';
import { TaskManager } from './models/TaskManager.js';
import { formatTask } from './utils/format.js'; // Exporting for convenience if needed, or user just uses demo.

export const createTaskApp = () => {
  const metrics = createMetrics();
  const taskManager = new TaskManager(store, metrics);
  
  return { 
    taskManager,
    // Expose helpers if needed by consumer, but requirements just say "Export what's needed for usage"
    // Usually factory is enough.
  };
};

export { formatTask }; // Export formatTask so demo can use it from library, or demo imports from utils.
// "Export what’s needed for usage"
