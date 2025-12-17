function validateTaskInput(input) {
  const tasks = Array.isArray(input) ? input : [input];

  const validPriorities = ["low", "medium", "high"];

  tasks.forEach((task) => {
    if (
      !task.title ||
      typeof task.title !== "string" ||
      task.title.trim() === ""
    ) {
      throw new Error(
        "Title diperlukan, harus string, dan tidak boleh kosong.",
      );
    }
    if (
      task.priority &&
      !validPriorities.includes(task.priority.toLowerCase())
    ) {
      throw new Error("Priority harus low, medium, atau high.");
    }
    if (task.dueDate !== null && task.dueDate !== undefined) {
      if (typeof task.dueDate !== "string") {
      }
      const dateObj = new Date(task.dueDate);
      if (isNaN(dateObj.getTime())) {
        throw new Error("Due date tidak valid.");
      }
    }
  });
  return input;
}
    
export default validateTaskInput;
