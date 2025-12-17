import { validateTaskInput } from "../utils/validate.js";

export class TaskManager {
    constructor(store, metrics) {
        this.store = store;
        this.metrics = metrics;
    }

    _findTaskIndex(tasks, id) {
        return tasks.findIndex(task => task.id === id);
    }

    async addTask(input) {
        this.metrics.inc('addTask');

        const validated = validateTaskInput(input);
        const tasks = await this.store.loadTasks();
        const now = new Date().toString();
        
        const newTask = {
            id: `t_${Date.now()}`,
            title: validated.title,
            status: 'open',
            priority: validated.priority,
            due: validated.due,
            createdAt: now,
            updatedAt: now
        };

        const updatedTasks = [...tasks, newTask];

        await this.store.saveTasks(updatedTasks)
        return newTask;
    }

    async listTasks(filter = {}) {
        this.metrics.inc('listTasks');

        const tasks = await this.store.loadTasks();

        if(filter.status) {
            return tasks.filter(task => task.status === filter.status);
        }
        return tasks;
    }

    async markDone(id) {
        this.metrics.inc('markDone');

        const tasks = await this.store.loadTasks();

        const index = this._findTaskIndex(tasks, id);

        if(index === -1) {
            throw new Error(`Task with id ${id} not found`);
        }

        const now = new Date().toISOString();

        const updatedTask = {
            ...tasks[index],
            status: 'done',
            updatedAt: now
        };

        const updatedTasks = [
            ...tasks.slice(0, index),
            updatedTask,
            ...tasks.slice(index + 1)
        ];

        await this.store.saveTasks(updatedTasks);
        return updatedTask;
    }

    async updateTask(id, patch) {
        this.metrics.inc('updateTask');
        const tasks = await this.store.loadTasks();
        const index = this._findTaskIndex(tasks, id);

        if(index === -1) {
            throw new Error(`Tasks with id ${id} not found`);
        }

        validateTaskInput({
            title: patch.title ?? tasks[index].title,
            priority: patch.priority ?? tasks[index].priority,
            due: patch.due ?? tasks[index].due
        });

        const now = new Date().toISOString();
        const updatedTask = {
            ...tasks[index],
            ...patch,
            updatedAt: now
        };

        const updatedTasks = [
            ...tasks.slice(0, index),
            updatedTask,
            ...tasks.slice(index + 1)
        ];

        await this.store.saveTasks(updatedTasks);

        return updatedTask;
    }

    async removeTask(id) {
        this.metrics.inc('removeTask');

        const tasks = await this.store.loadTasks();
        const index = this._findTaskIndex(tasks, id);

        if(index === -1) {
            throw new Error(`Task with id ${id} not found`);
        }

        const updatedTasks = tasks.filter(task => task.id !== id);

        await this.store.saveTasks(updatedTasks);

        return true;
    }

    async stats() {
        this.metrics.inc('stats');

        const tasks = await this.store.loadTasks();

        const total = tasks.length;
        const open = tasks.filter(t => t.status === 'open'.length);
        const done = tasks.filter(t => t.status === 'done'.length);

        const byPriority = {
            low: tasks.filter(t => t.priority === 'low').length,
            medium: tasks.filter(t => t.priority ==='medium').length,
            high: tasks.filter(t => t.priority === 'high').length
        };

        return {
            total,
            open,
            done,
            byPriority,
            actions: this.metrics.snapshot()
        };
    }
}

