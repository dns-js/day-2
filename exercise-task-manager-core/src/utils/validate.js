export const validateTaskInput = (input) => {
  const { title, priority, due } = input;

  if (!title || typeof title !== "string" || title.trim().length < 3)
    throw new Error(
      "title required, title must string, title minimum 3 characters",
    );

  if (!["low", "medium", "high"].includes(priority.toLowerCase()))
    throw new Error("Invalid priority");

  if (due) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(due)) throw new Error("Invalid due date");
  }

  return {
    title,
    priority,
    due,
  };
};
