import { readFile, writeFile, mkdir } from 'fs/promises';
import { dirname } from 'path';

const TASKS_FILE = 'data/tasks.json';

export async function loadTasks() {
  try {
    const data = await readFile(TASKS_FILE, 'utf-8');

    const tasks = JSON.parse(data);

    if (!Array.isArray(tasks)) {
      console.warn('Tasks file is not an array, starting fresh');
      return [];
    }

    return tasks;
  } catch (error) {
    if (error.code === 'ENOENT' || error instanceof SyntaxError) {
      return [];
    }

    throw error;
  }
}

export async function saveTasks(tasks) {
  try {
    const folder = dirname(TASKS_FILE);
    await mkdir(folder, { recursive: true });

    const jsonText = JSON.stringify(tasks, null, 2);
    await writeFile(TASKS_FILE, jsonText, 'utf-8');
  } catch (error) {
    throw new Error(`Failed to save tasks: ${error.message}`);
  }
}
