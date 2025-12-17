import fs from "fs/promises"

const FILE_PATH = "data/tasks.json"
export async function loadTasks() {
    try {
        const data = await fs.readFile(FILE_PATH, "utf-8")
        return JSON.parse(data)
    } catch (error) {
        return []
    }
}
export async function saveTasks(tasks) {
    const json = JSON.stringify(tasks, null, 2)
    await fs.writeFile(FILE_PATH, json)
}
