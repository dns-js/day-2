export function validateTaskInput(input = {}) {
  const { title, priority = "medium", due = null } = input;

  if (!title || typeof title !== "string") {
    throw new Error("title wajib dan harus string");
  }

  if (title.trim().length < 3) {
    throw new Error("title minimal 3 karakter");
  }

  const allowedPriorities = ["low", "medium", "high"];
  if (!allowedPriorities.includes(priority)) {
    throw new Error("priority harus diantara: low, medium, high");
  }

  if (due !== null) {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(due)) {
      throw new Error("due harus YYYY-MM-DD atau null");
    }
  }

  return {
    title: title.trim(),
    priority,
    due
  };
}
