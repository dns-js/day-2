import { validateTaskInput } from "../utils/validate.js";

export class TaskManager {
  constructor(store, metrics) {
    this.store = store;
    this.metrics = metrics;
  }

  _now() {
    return new Date().toISOString();
  }

  async addTask(input) {
    const { title, priority, due } = validateTaskInput(input);

    const tasks = await this.store.loadTasks();
    const now = this._now();

    const task = {
      id: `t_${Date.now()}`,
      title,
      status: "open",
      priority,
      due,
      createdAt: now,
      updatedAt: now
    };

    await this.store.saveTasks([...tasks, task]);
    this.metrics.inc("addTask");
    return task;
  }

  async listTasks(filter = {}) {
    const tasks = await this.store.loadTasks();
    if (filter.status) {
      return tasks.filter(t => t.status === filter.status);
    }
    return tasks;
  }

  async markDone(id) {
    return this.updateTask(id, { status: "done" });
  }

  async updateTask(id, patch) {
    const tasks = await this.store.loadTasks();
    const index = tasks.findIndex(t => t.id === id);

    if (index === -1) {
      throw new Error(`Task not found: ${id}`);
    }

    const updated = {
      ...tasks[index],
      ...patch,
      updatedAt: this._now()
    };

    const next = [...tasks];
    next[index] = updated;

    await this.store.saveTasks(next);
    this.metrics.inc("updateTask");
    return updated;
  }

  async removeTask(id) {
    const tasks = await this.store.loadTasks();
    const exists = tasks.some(t => t.id === id);

    if (!exists) {
      throw new Error(`Task not found: ${id}`);
    }

    await this.store.saveTasks(tasks.filter(t => t.id !== id));
    this.metrics.inc("removeTask");
  }

  async stats() {
  const tasks = await this.store.loadTasks();

  const statusCounts = {
    open: 0,
    done: 0
  };

  const priorityCounts = {
    low: 0,
    medium: 0,
    high: 0
  };

  for (const task of tasks) {
    statusCounts[task.status]++;
    priorityCounts[task.priority]++;
  }

  return {
    total: tasks.length,
    status: statusCounts,
    priority: priorityCounts,
    actions: this.metrics.snapshot()
  };
}

}
