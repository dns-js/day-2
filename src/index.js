import { createStore } from "./services/taskStore.js";
import { createMetrics } from "./services/metrics.js";
import { TaskManager } from "./models/TaskManager.js";

export const createTaskApp = async () => {
  const store = createStore();
  const metrics = createMetrics();

  const taskManager = new TaskManager(store, metrics);

  await taskManager.init();

  return { taskManager };
};
