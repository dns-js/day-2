import { validateTaskInput } from '../utils/validate.js';

export class TaskManager {
    constructor(store, metrics) {
        this.store = store;
        this.metrics = metrics;
    }

    async addTask(input) {
        validateTaskInput(input);
        const tasks = await this.store.loadTasks();
        const newTask = {
            id: `t_${Date.now()}`,
            title: input.title,
            status: 'open',
            priority: input.priority || 'medium',
            due: input.due || null,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        tasks.push(newTask);
        await this.store.saveTasks(tasks);
        this.metrics.inc('add');
        return newTask;
    }

    async removeTask(id) {
        let tasks = await this.store.loadTasks();
        const filtered = tasks.filter(t => t.id !== id);
        if (tasks.length === filtered.length) throw new Error("ID tidak ditemukan");
        await this.store.saveTasks(filtered);
        this.metrics.inc('delete');
    }

    async stats() {
        const tasks = await this.store.loadTasks();
        return {
            total: tasks.length,
            done: tasks.filter(t => t.status === 'done').length,
            metrics: this.metrics.snapshot()
        };
    }
}

const mockStore = {
    loadTasks: async () => [],
    saveTasks: async (t) => console.log("Simpan ke JSON...")
};
const mockMetrics = { inc: () => { } };

const tm = new TaskManager(mockStore, mockMetrics);
console.log("Testing TaskManager...");
const task = await tm.addTask({ title: "Unit Test Task" });
console.log("Berhasil membuat task:", task.title);
