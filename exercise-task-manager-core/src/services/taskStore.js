import { readFile, writeFile } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const data_path = path.resolve(__dirname, "../../data/tasks.json");

const loadTasks = async () => {
  try {
    const raw = await readFile(data_path, "utf-8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    throw new Error("Failed to load tasks");
  }
};

const saveTasks = async (tasks) => {
  try {
    const json = JSON.stringify(tasks, null, 2);
    await writeFile(data_path, json, "utf-8");
  } catch (err) {
    throw new Error("Failed to save tasks");
  }
};

export { loadTasks, saveTasks };
