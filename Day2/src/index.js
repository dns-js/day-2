import { TaskManager } from "./models/TaskManager.js";
import { taskStore } from "./service/taskStore.js";
import createMetrics from "./service/metrics.js";

export function createTaskApp() {
  const store = taskStore();
  const metricsService = createMetrics();

  const taskManager = new TaskManager(store, metricsService);

  return {
    taskManager,
  };
}
