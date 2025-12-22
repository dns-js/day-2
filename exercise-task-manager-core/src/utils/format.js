export const formatTask = (task) => {
  const { id, title, status, priority, due } = task;

  return `Task ${id}: "${title}", Status: ${status}, Priority: ${priority}, Due: ${due ?? "null"}`;
};
