export function validateTaskInput(input = {}) {
  const { title, priority = "medium", due = null } = input;

  if (!title || typeof title !== "string") {
    throw new Error("Title is required and must be a string");
  }
  if (title.trim().length < 3) {
    throw new Error("Title must be at least 3 characters long");
  }
  const correctPriorities = ["low", "medium", "high"];
  if (!correctPriorities.includes(priority)) {
    throw new Error(`Priority must be either low, medium or high`);
  }

  if (due !== null) {
    const dateFormat = /^\d{4}-\d{2}-\d{2}$/;
    if (typeof due !== "string" || !dateFormat.test(due)) {
      throw new Error("Due date must be in YYYY-MM-DD or null");
    }
  }

  return {
    title: title.trim(),
    priority,
    due
  };
}

const testTask = {
    id: "task1",
    title: "Finish day 1 assignment",
    status: "done",
    priority: "high",
    due: "2025-12-16",
    createdAt: "2025-12-15",
    updatedAt: "2025-12-15"  
}
console.log(validateTaskInput(testTask));