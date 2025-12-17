import { createTaskApp } from "./index.js";
import { formatTask } from "./utils/format.js";

async function runDemo() {
  const { taskManager } = createTaskApp();

  try {
    // Add 3 Task
    const task1 = await taskManager.addTask({
      title: "Learn JavaScript",
      priority: "high",
      due: "2025-12-20",
    });
    const task2 = await taskManager.addTask({
      title: "Write blog post",
      priority: "medium",
    });
    const task3 = await taskManager.addTask({
      title: "Do laundry",
      priority: "low",
      due: "2025-12-18",
    });

    // Lists tasks
    const allTasks = await taskManager.listTasks();
    allTasks.forEach((task) => console.log(formatTask(task)));

    // Marks one task done
    await taskManager.markDone(task1.id);
    const afterDone = await taskManager.listTasks();
    afterDone.forEach((task) => console.log(formatTask(task)));

    // Updates one task
    await taskManager.updateTask(task2.id, {
      title: "Write amazing blog post",
    });
    const afterUpdate = await taskManager.listTasks();
    afterUpdate.forEach((task) => console.log(formatTask(task)));

    // Removes one task
    await taskManager.removeTask(task3.id);
    const afterRemove = await taskManager.listTasks();
    afterRemove.forEach((task) => console.log(formatTask(task)));

    // Prints stats
    const stats = await taskManager.stats();
    console.log(stats);
  } catch (err) {
    console.error("Error:", err.message);
  }
}

runDemo();
