
export const formatTask = (task) => {
  const { id, title, status, priority, due } = task;
  const dueStr = due ? `(Due: ${due})` : '';
  const statusIcon = status === 'done' ? '[x]' : '[ ]';
  
  return `${id} | ${statusIcon} ${title} [${priority}] ${dueStr}`.trim();
};
