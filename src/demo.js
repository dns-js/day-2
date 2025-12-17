import { createTaskApp } from "./index.js";
import { formatTask } from "./utils/format.js";

const { taskManager } = createTaskApp();

async function test() {
  try {
    const t1 = await taskManager.addTask({
      title: "Write docs",
      priority: "high",
    });
    const t2 = await taskManager.addTask({
      title: "Fix bugs",
      due: "2025-01-10",
    });
    const t3 = await taskManager.addTask({
      title: "Team meeting",
      priority: "low",
    });

    console.log("\n\t\t\t>>>>> SEMUA TASK <<<<<\n");
    (await taskManager.listTasks()).forEach((t) => console.log(formatTask(t)));

    await taskManager.markDone(t1.id);
    await taskManager.updateTask(t2.id, { priority: "high" });
    await taskManager.removeTask(t3.id);

    console.log("\n\t\t\t>>>>> UPDATED <<<<<\n");
    (await taskManager.listTasks()).forEach((t) => console.log(formatTask(t)));

    console.log("\n\t\t\t>>>>> STATS <<<<<\n");
    console.log(await taskManager.stats());
  } catch (err) {
    console.error("Error:", err.message);
  }
}

test();
