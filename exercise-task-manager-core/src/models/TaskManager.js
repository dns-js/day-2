import { validateTaskInput } from "../utils/validate.js";

export class TaskManager {
  constructor(store, metrics) {
    this.store = store;
    this.metrics = metrics;
  }

  async addTask(input) {
    this.metrics.inc("addTask");

    const validInput = validateTaskInput(input);

    const tasks = await this.store.loadTasks();
    const now = new Date().toISOString();

    const newTask = {
      id: "t_" + Date.now(),
      title: validInput.title,
      status: "open",
      priority: validInput.priority,
      due: validInput.due,
      createdAt: now,
      updatedAt: now,
    };

    const updatedTasks = [...tasks, newTask];

    await this.store.saveTasks(updatedTasks);
    return newTask;
  }

  async listTasks() {
    this.metrics.inc("listTasks");

    const tasks = await this.store.loadTasks();

    if (filter.status)
      return tasks.filter((task) => task.status === filter.status);

    return tasks;
  }

  async markDone(id) {
    this.metrics.inc("markDone");

    const tasks = await this.store.loadTasks();
    const now = new Date().toISOString();

    let foundTask = false;

    const updatedTasks = tasks.map((task) => {
      if (task.id !== id) return task;

      foundTask = true;
      return {
        ...task,
        status: "done",
        updatedAt: now,
      };
    });

    if (!foundTask) throw new Error(`Task not found`);

    await this.store.saveTasks(updatedTasks);
  }

  async updateTask(id, patch) {
    this.metrics.inc("updateTask");

    const tasks = await this.store.loadTasks();
    const now = new Date().toISOString();

    let foundTask = false;

    const updatedTasks = tasks.map((task) => {
      if (task.id !== id) return task;

      foundTask = true;

      const updated = {
        ...task,
        ...patch,
      };

      validateTaskInput({
        title: updated.title,
        priority: updated.priority,
        due: updated.due,
      });

      return {
        ...updated,
        updatedAt: now,
      };
    });

    if (!foundTask) {
      throw new Error(`Task not found`);
    }

    await this.store.saveTasks(updatedTasks);
  }

  async removeTask(id) {
    this.metrics.inc("removeTask");

    const tasks = await this.store.loadTasks();
    const filteredTasks = tasks.filter((task) => task.id !== id);

    if (filteredTasks.length === tasks.length) {
      throw new Error(`Task not found`);
    }

    await this.store.saveTasks(filteredTasks);
  }

  async stats() {
    this.metrics.inc("stats");

    const tasks = await this.store.loadTasks();

    return {
      total: tasks.length,
      open: tasks.filter((t) => t.status === "open").length,
      done: tasks.filter((t) => t.status === "done").length,
      actions: this.metrics.snapshot(),
    };
  }
}
