import { createTaskApp, formatTask } from './index.js';

console.log("--- Task Manager Demo ---\n");

const { taskManager } = createTaskApp();

try {
  // 1. Add 3 tasks
  console.log("Adding tasks...");
  const t1 = await taskManager.addTask({ title: 'Design Database', priority: 'high', due: '2025-12-20' });
  const t2 = await taskManager.addTask({ title: 'API Implementation', priority: 'medium' });
  const t3 = await taskManager.addTask({ title: 'Write Documentation', priority: 'low' });
  console.log("Tasks added.");

  // 2. List tasks
  console.log("\nCurrent Tasks:");
  const tasks = await taskManager.listTasks();
  tasks.forEach(t => console.log(formatTask(t)));

  // 3. Mark one done
  console.log(`\nMarking task '${t1.title}' as done...`);
  await taskManager.markDone(t1.id);

  // 4. Update one task
  console.log(`Updating task '${t2.title}' priority to high...`);
  await taskManager.updateTask(t2.id, { priority: 'high' });

  // 5. Remove one task
  console.log(`Removing task '${t3.title}'...`);
  await taskManager.removeTask(t3.id);

  // 6. List again to verify
  console.log("\nTasks after updates:");
  const finalTasks = await taskManager.listTasks();
  finalTasks.forEach(t => console.log(formatTask(t)));

  // 7. Stats
  console.log("\n--- Stats ---");
  const statistics = await taskManager.stats();
  console.log(JSON.stringify(statistics, null, 2));

} catch (error) {
  console.error("Error:", error.message);
}
