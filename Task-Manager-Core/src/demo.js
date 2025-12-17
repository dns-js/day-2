import { formatTask } from "./utils/format.js"

const task = {
    id: "t_1",
    title: "Belajar",
    status: "open",
    priority: "high",
    due: "2025-12-20"
}

console.log(formatTask(task))
