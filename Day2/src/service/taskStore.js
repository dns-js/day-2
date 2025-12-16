import { readFile, writeFile } from "fs/promises"

const filePath = '../../data/tasks.json'

export async function loadTask() {
    try {
        const response = await readFile(filePath)
        return JSON.parse(response)    
    } catch (error) {
        return [];
    }
}

export async function saveTask(tasks) {
    const updatedData = JSON.stringify(tasks, null, 2)
    await writeFile(filePath, updatedData)
}


