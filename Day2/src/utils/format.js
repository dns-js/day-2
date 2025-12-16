
export function formatTask(task) {
    const { id, title, status, priority, due } = task;
    return `[${id}] ${title} | Status: ${status} | Priority: ${priority} | Due: ${due || "Tanpa Tenggat"}`;
}

