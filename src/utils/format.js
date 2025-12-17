export function formatTask(task) {
    const {id, title, status, priority, due} = task;

    return `[${id}] ${title} | status: ${status} | priority: ${priority} | due: ${due ?? '-'}`;
}