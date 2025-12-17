import { readFile, writeFile } from "fs/promises";

const FILE_PATH = new URL("../../data/tasks.json", import.meta.url);

export async function loadTasks() {
  try {
    const raw = await readFile(FILE_PATH, "utf-8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    return [];
  }
}

export async function saveTasks(tasks) {
  await writeFile(FILE_PATH, JSON.stringify(tasks, null, 2));
}
