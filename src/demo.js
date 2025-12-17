import { createTaskApp } from "./index.js";
import { formatTask } from "./utils/format.js";

const { taskManager } = createTaskApp();

async function runDemo() {
  try {
    const t1 = await taskManager.addTask({
      title: "finish 2nd assignment",
      priority: "high",
      due: "2025-12-18"
    });

    const t2 = await taskManager.addTask({
      title: "learn day 3 materials",
      priority: "medium"
    });

    const t3 = await taskManager.addTask({
      title: "finish weekly ppt",
      priority: "low",
      due: "2025-12-19"
    });

    console.log("\nList of tasks:");
    const tasks = await taskManager.listTasks();
    tasks.forEach(t => console.log(formatTask(t)));

    console.log("\nMarking one task as done");
    await taskManager.markDone(t2.id);

    console.log("\nupdating: task");
    await taskManager.updateTask(t1.id, {
      title: "push 2nd assignment to repo",
    });

    console.log("\nRemoving one task");
    await taskManager.removeTask(t2.id);

    console.log("\nFinal list of tasks:");
    const finalTasks = await taskManager.listTasks();
    finalTasks.forEach(t => console.log(formatTask(t)));

    console.log("\nStatistics:");
    console.log(await taskManager.stats());
  } catch (err) {
    console.error("Error:", err.message);
  }
}

runDemo();
