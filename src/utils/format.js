export function formatTask(task) {
  const { id, title, status, priority, due } = task;

  return `id: ${id} | task name: ${title} | status: ${status} |priority: ${priority} | due date: ${due ?? 'none'}`;
}
