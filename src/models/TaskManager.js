import randomUUID from "node:crypto";
import { validateTaskInput } from "../utils/validate.js";

export class TaskManager {
  constructor(store, metrics) {
    this.store = store;
    this.metrics = metrics;
    this.tasks = [];
  }

  async init() {
    this.tasks = await this.store.loadTasks();
  }

  async addTask(input) {
    validateTaskInput(input);

    const newTask = {
      id: `t_${randomUUID}`,
      ...input,
    //   title: input.title,
      status: "open",
    //   priority: input.priority || "medium",
    //   due: input.due || null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    this.tasks.push(newTask);

    await this.store.saveTasks(this.tasks);

    this.metrics.inc("add_task");

    return newTask;
  }

  listTasks(filter = {}) {
    this.metrics.inc("list_tasks");

    if (filter.status) {
      return this.tasks.filter((t) => t.status === filter.status);
    }
    return this.tasks;
  }

  async updateTask(taskId, updates) {
    const index = this.tasks.findIndex((t) => t.id === taskId);

    if (index === -1) {
      throw new Error(`Task ID ${taskId} tidak ditemukan`);
    }

    this.tasks[index] = {
      ...this.tasks[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    await this.store.saveTasks(this.tasks);
    this.metrics.inc("update_task");

    return this.tasks[index];
  }

  async markDone(taskId) {
    return this.updateTask(taskId, { status: "done" });
  }

  async removeTask(taskId) {
    const awal = this.tasks.length;

    this.tasks = this.tasks.filter((t) => t.id !== taskId);

    if (this.tasks.length === awal) {
      throw new Error(`gagal hapus. ID ${taskId} tidak ditemukan.`);
    }

    await this.store.saveTasks(this.tasks);
    this.metrics.inc("remove_task");
  }

  stats() {
    this.metrics.inc("check_stats");

    const total = this.tasks.length;
    const done = this.tasks.filter((t) => t.status === "done").length;

    return {
      total_tasks: total,
      open: total - done,
      done: done,
      activity_log: this.metrics.snapshot(),
    };
  }
}
