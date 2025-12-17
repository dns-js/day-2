import fs from 'fs/promises';

const FILE_PATH = './data/tasks.json';

export async function loadTasks() {
    try {
        const data = await fs.readFile(FILE_PATH);
        return JSON.parse(data);
    } catch (error) {
        error;
        return []; // Jika file tidak ada, anggap array kosong
    }
}

export async function saveTasks(tasks) {
    await fs.writeFile(FILE_PATH, JSON.stringify(tasks, null, 2));
}

await saveTasks([{ id: "test_1", title: "Testing Store" }]);
const data = await loadTasks();
console.log("Data berhasil disimpan & dimuat:", data[0].title);