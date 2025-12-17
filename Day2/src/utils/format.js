export function formatTask(task) {
  const dueString = task.dueDate ? task.dueDate : "Tanpa Tenggat";
  const statusString = task.status ? task.status.toUpperCase() : "UNKNOWN";

  return `[${task.id}] ${task.title} | Status: ${statusString} | Priority: ${task.priority} | Due: ${dueString}`;
}
