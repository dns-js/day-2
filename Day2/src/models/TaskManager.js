import validateTaskInput  from "../utils/validate.js";


export class TaskManager {
    constructor(store, metrics){
        this.store = store
        this.metrics = metrics
    }

    async addTask(input) {
        const validData = validateTaskInput(input)
        const tasks = await this.store.loadTasks()

        const newTask = {
            id: `t_${Date.now()}`,
            ...validData,
            status: "open",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        }

        tasks.push(newTask)
        await this.store.saveTasks(tasks)

        this.metrics.inc("addTask")
        return newTask
    }    

    async listTasks(filter = {}) {
        const tasks = await this.store.loadTasks()

        if (filter.status) {
            const filtered = tasks.filter((t) => t.status === filter.status)
            this.metrics.inc("listFiltered")
            return filtered
        }
        this.metrics.inc("listAll")
        return tasks
    }

    async updateTask (id, patch){
        const tasks = await this.store.loadTasks()
        const index = tasks.findIndex((t) => t.id === id)
        if (index === -1){
            throw new Error("Task tidak ditemukan");
        }

        const oldTask = tasks[index];

        const updatedTask = {
            ...oldTask,
            ...patch,
            updateAt: new Date().toISOString()
        }

        tasks[index] = updatedTask
        await this.store.saveTasks(tasks);
        return updatedTask
    }

    async markDone (id) {
        this.metrics.inc("taskDone")
        return await this.updateTask(id, {status: "done"})
    }

    async removeTask (id) {
        const tasks = await this.store.loadTasks()

        const exists = tasks.some((t) => t.id === id)
        if (!exists){
            throw new Error(`Data tidak dihapus, data tidak ada`);
        }
        const newTaskList = tasks.filter((t) => t.id !== id)
        await this.store.saveTasks(newTaskList)
        this.metrics.inc("removeTask")
    }

    async stats (){
        const tasks = await this.store.loadTasks()

        const total = tasks.length
        const done = tasks.filter(t => t.status === 'done').length
        const open = tasks.filter(t => t.status === 'open').length
        const listOfAction = this.metrics.snapshot();
        
        this.metrics.inc("viewStats")
        return {
            total: total,
            done: done,
            progress: open,
            listOfAction: listOfAction
        }
    }
}