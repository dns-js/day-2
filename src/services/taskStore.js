import { readFile, writeFile } from 'fs/promises';
import path from 'path';


const DATA_PATH = path.resolve('./data/tasks.json');


export async function loadTasks() {
     try {
          const data = await readFile(DATA_PATH, 'utf-8');
          const parsed = JSON.parse(data);


          // Pastikan selalu array
          return Array.isArray(parsed) ? parsed : [];
     } catch (error) {
          // Jika file tidak ada atau JSON invalid
          return [];
     }
}


export async function saveTasks(tasks) {
     if (!Array.isArray(tasks)) {
          throw new Error('Tasks must be an array');
     }


     await writeFile(DATA_PATH, JSON.stringify(tasks, null, 2));
}