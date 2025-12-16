import { TaskManager } from "./models/TaskManager";
import { taskStore } from "./service/taskStore"
import { createMetrics } from "./service/metrics";

export function createTaskApp() {
    const store = taskStore()
    const metricsService = createMetrics()

    const taskManager = new TaskManager(store, metricsService)

    return {
        taskManager
    }
}