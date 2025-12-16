import { validateTaskInput } from "../utils/validate.js";


export class TaskManager {
    constructor(store, metrics){
        this.store = store
        this.metrics = metrics
    }

async addTask(input) {
    const validData = validateTaskInput(input)
    const tasks = await this.store.loadTask()

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
}