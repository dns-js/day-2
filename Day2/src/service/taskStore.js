import { readFile, writeFile } from "fs/promises"


const data = {
    "id": "t_1001",
    "title": "Menyelesaikan laporan akhir tahun",
    "status": "open",
    "priority": "high",
    "due": "2024-12-31",
    "createdAt": "2024-10-01T09:00:00.000Z",
    "updatedAt": "2024-10-05T14:30:00.000Z"
  }


async function loadTask() {
    const response = await readFile('../../data/tasks.json')
    const data = JSON.parse(response)
    return data
}

async function saveTask(data) {
    const datas = await loadTask()
    datas.push(data)
    const updatedData = JSON.stringify(datas, null, 2)
    await writeFile('../../data/tasks.json', updatedData)
}

export default { loadTask, saveTask }
saveTask(data)
