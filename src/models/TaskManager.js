import { validateTaskInput } from '../utils/validate.js';

export class TaskManager {
    constructor({ store, metrics }) {
        this.store = store;
        this.metrics = metrics;
    }

    async addTask(input) {
        const clean = validateTaskInput(input);
        const tasks = await this.store.loadTasks();

        const now = new Date().toISOString();

        const task = {
            id: `t_${Date.now()}`,
            title: clean.title,
            status: 'open',
            priority: clean.priority,
            due: clean.due,
            createdAt: now,
            updateAt: now,
        };

        const nextTasks = [...tasks, task]; // immutability

        await this.store.saveTasks(nextTasks);
        this.metrics.inc('addTask');

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
        const tasks = await this.store.loadTasks();
        let found = false;

        const nextTasks = tasks.map(task => {
            if (task.id !== id) return task;
            found = true;
            return {
                ...task,
                status: 'done',
                updateAt: new Date().toISOString(),
            };
        });

        if (!found) throw new Error('Task tidak ditemukan');

        await this.store.saveTasks(nextTasks);
        this.metrics.inc('markDone');
    }

    async updateTask(id, patch) {
        const tasks = await this.store.loadTasks();
        let found = false;

        const nextTasks = tasks.map(task => {
            if (task.id !== id) return task;
            found = true;

            const updated = {
                ...task,
                ...patch,
                updatedAt: new Date().toISOString(),
            };

            return updated;
        });
        if (!found) throw new Error('Task tidak ditemukan');

        await this.store.saveTasks(nextTasks);
        this.metrics.inc('updateTask');
    }

    async removeTask(id) {
        const tasks = await this.store.loadTasks();
        const nextTasks = tasks.filter(t => t.id !== id);

        if (tasks.length === nextTasks.length) {
            throw new Error('Task tidak ditemukan');
        }

        await this.store.saveTasks(nextTasks);
        this.metrics.inc('removeTask');
    }
    
    async stats() {
        return this.metrics.snapshot();
    }
}