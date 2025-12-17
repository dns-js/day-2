export function formatTask(task) {
  const { id, title, status, priority, due } = task;
  
  const statusIcon = status === 'done' ? '✓' : '○';
  
  const priorityLabel = priority.toUpperCase().padEnd(6);
  
  const dueInfo = due ? `(due: ${due})` : '';
  
  return `[${statusIcon}] ${id} | ${priorityLabel} | ${title} ${dueInfo}`.trim();
}