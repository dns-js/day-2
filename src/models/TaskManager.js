import { validateTaskInput } from "../utils/validate.js";

export class TaskManager {
  constructor({ store, metrics }) {
    this.store = store;
    this.metrics = metrics;
  }

  _now() {
    return new Date().toISOString();
  }

  _generateId() {
    return `t_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
  }

  async addTask(input) {
    this.metrics.inc("addTask");

    const data = validateTaskInput(input);
    const tasks = await this.store.loadTasks();

    const now = this._now();
    const task = {
      id: this._generateId(),
      title: data.title,
      status: "open",
      priority: data.priority,
      due: data.due,
      createdAt: now,
      updatedAt: now
    };

    await this.store.saveTasks([...tasks, task]);
    return task;
  }

  async listTasks(filter = {}) {
    this.metrics.inc("listTasks");

    const tasks = await this.store.loadTasks();

    if (filter.status) {
      return tasks.filter(t => t.status === filter.status);
    }

    return tasks;
  }

  async markDone(id) {
    this.metrics.inc("markDone");

    const tasks = await this.store.loadTasks();
    let found = false;

    const updated = tasks.map(task => {
      if (task.id === id) {
        found = true;
        return {
          ...task,
          status: "done",
          updatedAt: this._now()
        };
      }
      return task;
    });

    if (!found) throw new Error(`Task tidak ditemukan: ${id}`);

    await this.store.saveTasks(updated);
  }

  async updateTask(id, patch) {
    this.metrics.inc("updateTask");

    validateTaskInput({ ...patch, title: patch.title ?? "tmp" });

    const tasks = await this.store.loadTasks();
    let found = false;

    const updated = tasks.map(task => {
      if (task.id === id) {
        found = true;
        return {
          ...task,
          ...patch,
          updatedAt: this._now()
        };
      }
      return task;
    });

    if (!found) throw new Error(`Task tidak ditemukan: ${id}`);

    await this.store.saveTasks(updated);
  }

  async removeTask(id) {
    this.metrics.inc("removeTask");

    const tasks = await this.store.loadTasks();
    const filtered = tasks.filter(t => t.id !== id);

    if (filtered.length === tasks.length) {
      throw new Error(`Task tidak ditemukan: ${id}`);
    }

    await this.store.saveTasks(filtered);
  }

  async stats() {
    this.metrics.inc("stats");

    const tasks = await this.store.loadTasks();

    const total = tasks.length;
    const open = tasks.filter(t => t.status === "open").length;
    const done = tasks.filter(t => t.status === "done").length;

    const byPriority = tasks.reduce((acc, t) => {
      acc[t.priority] = (acc[t.priority] || 0) + 1;
      return acc;
    }, {});

    return {
      total,
      open,
      done,
      byPriority,
      actions: this.metrics.snapshot()
    };
  }
}
