import { readFile, writeFile } from "fs/promises";

const filePath = "./data/tasks.json";
export function taskStore() {
  return {
    async loadTasks() {
      try {
        const response = await readFile(filePath);
        return JSON.parse(response);
      } catch (error) {
        return [];
      }
    },
    async saveTasks(tasks) {
      const updatedData = JSON.stringify(tasks, null, 2);
      await writeFile(filePath, updatedData);
    },
  };
}
