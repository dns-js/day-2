export function formatTask(task) {
  const { id, title, status, priority, due } = task;
  const statusIcon = status === 'done' ? '[✓]' : '[ ]';
  const dueInfo = due ? `(Due: ${due})` : '';
  
  return `${statusIcon} ${id.slice(0, 5)}... | ${title.padEnd(20)} | ${priority.toUpperCase()} ${dueInfo}`;
}

const dummy = { id: "t_12345", title: "Test Task", status: "open", priority: "high", due: "2025-12-31" };
console.log("Contoh format output:");
console.log(formatTask(dummy));