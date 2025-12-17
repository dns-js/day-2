export function formatTask(task) {
    const { id, title, status, priority, due } = task
    const formatted = `ID: ${id} | Title: ${title} | Status: ${status} | Priority: ${priority} | Due: ${due || "none"}`

    return formatted
}