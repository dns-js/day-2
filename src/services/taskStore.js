import { readFile, writeFile } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_PATH = path.resolve(__dirname, '../../data/tasks.json');

export async function loadTasks() {
  try {
    const raw = await readFile(DATA_PATH, 'utf-8');
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    err;
    return [];
  }
}

export async function saveTasks(tasks) {
  await writeFile(DATA_PATH, JSON.stringify(tasks, null, 2));
}

const testTask = {
  id: 'task1',
  title: 'Finish day 1 assignment',
  status: 'done',
  priority: 'high',
  due: '2025-12-16',
  createdAt: '2025-12-15',
  updatedAt: '2025-12-15',
};

const testsave = await saveTasks([testTask]);
const test = await loadTasks();
console.log(testsave);
console.log(test);
