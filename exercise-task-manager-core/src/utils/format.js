export const formatTask = (task) => {
  const { id, title, status, priority, due } = task;

  return { id, title, status, priority, due: due ?? null };
};
