import { validateTaskInput } from "./utils/validate.js";
import { loadTasks, saveTasks } from "./services/taskStore.js";
import { createMetrics } from "./services/metrics.js";

const metrics = createMetrics();

const tasks = await loadTasks();

const input = validateTaskInput({
  title: "Learn async persistence",
  priority: "Medium",
  due: "2025-01-01",
});

const now = new Date().toISOString();

tasks.push({
  id: "t_" + Date.now(),
  status: "open",
  createdAt: now,
  updatedAt: now,
  ...input,
});

metrics.inc("createTask");

await saveTasks(tasks);

console.log("Metrics:", metrics.snapshot());
