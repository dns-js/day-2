import { createTaskApp } from './index.js';
import { formatTask } from './utils/format.js';

const { taskManager } = createTaskApp();

async function runDemo() {
  try {
    console.log("=== STEP 1: ADDING TASKS ===");
    const t1 = await taskManager.addTask({ title: "Belajar Arsitektur Node.js", priority: "low" });
    const t2 = await taskManager.addTask({ title: "Beli Kopi", priority: "low" });
    const t3 = await taskManager.addTask({ title: "Meeting Project", priority: "medium", due: "2025-12-30" });
    console.log("3 Tasks added successfully.\n");

    console.log("=== STEP 2: LISTING ALL TASKS ===");
    const allTasks = await taskManager.listTasks();
    allTasks.forEach(t => console.log(formatTask(t)));
    console.log("");

    console.log("=== STEP 3: MARKING DONE & UPDATING ===");
    await taskManager.markDone(t1.id);
    console.log(`Task '${t1.title}' marked as DONE.`);
    
    await taskManager.updateTask(t2.id, { title: "Beli Kopi Arabika", priority: "medium" });
    console.log(`Task '${t2.id}' updated.\n`);

    console.log("=== STEP 4: REMOVING A TASK ===");
    await taskManager.removeTask(t3.id);
    console.log(`Task '${t3.title}' removed.\n`);

    console.log("=== STEP 5: FINAL STATS ===");
    const statistics = await taskManager.stats();
    console.log(JSON.stringify(statistics, null, 2));

  } catch (error) {
    console.error("DEMO FAILED:", error.message);
  }
}

runDemo();