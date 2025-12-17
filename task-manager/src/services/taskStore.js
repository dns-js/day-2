import { promises } from "dns";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_PATH = path.join(__dirname, "../../data/tasks.json");

/**
 *  
 * @returns {promise<Array>} 
 */
export async function loadTasks() {
    try {
        const data = await fs.readFile(DATA_PATH, 'utf-8');
        const parsed = JSON.parse(data);
        
        if (!Array.isArray(parsed)) {
            return [];
        }
        return parsed;

  } catch (error) {
        return [];
  }
}

/**
 * 
 * @param {Array} tasks
 */
export async function saveTasks(tasks) {
    try {
        const safeTasks = Array.isArray(tasks) ? tasks : [];
        const json = JSON.stringify(safeTasks, null, 2);
        await fs.writeFile(DATA_PATH, json, 'utf-8');
    } catch (error) {
        console.log('Failed to save tasks!');
    }
}
// export async function saveTasks(tasks) {
//   if (!Array.isArray(tasks)) {
//     throw new Error("saveTasks expects an array");
//   }

//   const json = JSON.stringify(tasks, null, 2);
//   await fs.writeFile(DATA_PATH, json, "utf-8");
// }