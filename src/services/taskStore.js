import { readFile, writeFile } from 'fs/promises';
import { join } from 'path';

// Simplified path resolution - relying on CWD is risky in prod but okay for this CLI task context or use relative URL.
// Sticking to safer absolute path but concise.
const DATA_FILE = new URL('../../data/tasks.json', import.meta.url);

export const loadTasks = async () => {
  try {
    return JSON.parse(await readFile(DATA_FILE, 'utf-8'));
  } catch (e) {
    if (e.code === 'ENOENT' || e instanceof SyntaxError) return [];
    throw e;
  }
};

export const saveTasks = async (tasks) => {
  await writeFile(DATA_FILE, JSON.stringify(tasks, null, 2));
};
