import { loadTasks, saveTasks } from './services/taskStore.js';
import { createMetrics } from './services/metrics,js';
import { TaskManager } from './models/TaskManager.js';

export function createTaskApp() {
    // instantiate dependencies
    const store = { loadTasks, saveTasks };
    const metrics = createMetrics();

    // intantiate core
    const taskManager = new TaskManager({ store, metrics });

    return {
        taskManager,
    };
}