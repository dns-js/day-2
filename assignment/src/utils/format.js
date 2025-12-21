export function formatTask(task) {
  const { id, title, status, priority, due } = task;

  const statusLabel = status || 'open';

  const priorityLabel = priority.toUpperCase().padEnd(6);

  const dueInfo = due ? `(due: ${due})` : '';

  return `[${statusLabel}] ${id} | ${priorityLabel} | ${title} ${dueInfo}`.trim();
}
