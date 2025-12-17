import { validateTaskInput } from "../utils/validate.js";

export class TaskManager {
     constructor(store, metrics) {
          this.store = store;
          this.metrics = metrics;
     }

     async addTask(input) {
          validateTaskInput(input);
          const tasks = await this.store.loadTasks();

          const newTask = {
               id: `t_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
               title: input.title,
               status: "open",
               priority: input.priority,
               due: input.due || null,
               createdAt: new Date().toISOString(),
               updatedAt: new Date().toISOString(),
          };

          tasks.push(newTask);
          await this.store.saveTasks(tasks);
          this.metrics.inc("add");
          return newTask;
     }

     async listTasks(filter = {}) {
          let tasks = await this.store.loadTasks();
          if (filter.status) {
               tasks = tasks.filter((t) => t.status === filter.status);
          }
          this.metrics.inc("list");
          return tasks;
     }

     async markDone(id) {
          const tasks = await this.store.loadTasks();
          const index = tasks.findIndex((t) => t.id === id);
          if (index === -1) throw new Error(`Task ID ${id} tidak ditemukan.`);

          tasks[index] = {
               ...tasks[index],
               status: "done",
               updatedAt: new Date().toISOString(),
          };

          await this.store.saveTasks(tasks);
          this.metrics.inc("update");
     }

     async updateTask(id, patch) {
          const tasks = await this.store.loadTasks();
          const index = tasks.findIndex((t) => t.id === id);
          if (index === -1) throw new Error("Task tidak ditemukan.");

          // Gabungkan data lama dengan patch baru
          tasks[index] = {
               ...tasks[index],
               ...patch,
               updatedAt: new Date().toISOString(),
          };

          await this.store.saveTasks(tasks);
          this.metrics.inc("update");
          return tasks[index];
     }

     async removeTask(id) {
          const tasks = await this.store.loadTasks();
          const filteredTasks = tasks.filter((t) => t.id !== id);

          if (tasks.length === filteredTasks.length) {
               throw new Error("Gagal menghapus: ID tidak ditemukan.");
          }

          await this.store.saveTasks(filteredTasks);
          this.metrics.inc("delete");
     }

     async stats() {
          const tasks = await this.store.loadTasks();
          const metricsSnapshot = this.metrics.snapshot();

          const statsObj = {
               total: tasks.length,
               status: {
                    open: tasks.filter((t) => t.status === "open").length,
                    done: tasks.filter((t) => t.status === "done").length,
               },
               priority: {
                    low: tasks.filter((t) => t.priority === "low").length,
                    medium: tasks.filter((t) => t.priority === "medium").length,
                    high: tasks.filter((t) => t.priority === "high").length,
               },
               actions: metricsSnapshot,
          };

          this.metrics.inc("stats");
          return statsObj;
     }
}
