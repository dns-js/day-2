import { createTaskApp, formatTask } from './index.js';

async function runDemo() {
  console.log('=== Task Manager Demo ===\n');
  
  const { taskManager } = createTaskApp();
  
  try {
    console.log('Adding 3 tasks...\n');
    
    const task1 = await taskManager.addTask({
      title: 'Complete project documentation',
      priority: 'high',
      due: '2025-12-31'
    });
    console.log(`Added: ${formatTask(task1)}`);
    
    const task2 = await taskManager.addTask({
      title: 'Review pull requests',
      priority: 'medium',
      due: '2025-12-20'
    });
    console.log(`Added: ${formatTask(task2)}`);
    
    const task3 = await taskManager.addTask({
      title: 'Update dependencies',
      priority: 'low'
    });
    console.log(`Added: ${formatTask(task3)}`);
    
    console.log('\nListing all tasks:\n');
    const allTasks = await taskManager.listTasks();
    allTasks.forEach(task => {
      console.log(`  ${formatTask(task)}`);
    });
    
    console.log(`\nMarking task as done (${task2.id})...\n`);
    const doneTask = await taskManager.markDone(task2.id);
    console.log(`Updated: ${formatTask(doneTask)}`);
    
    console.log(`\nUpdating task (${task1.id})...\n`);
    const updatedTask = await taskManager.updateTask(task1.id, {
      title: 'Complete comprehensive project documentation',
      priority: 'high',
      due: '2025-12-25'
    });
    console.log(`Updated: ${formatTask(updatedTask)}`);
    
    console.log(`\nRemoving task (${task3.id})...\n`);
    const removedTask = await taskManager.removeTask(task3.id);
    console.log(`Removed: ${formatTask(removedTask)}`);
    
    console.log('\nRemaining tasks:\n');
    const remainingTasks = await taskManager.listTasks();
    remainingTasks.forEach(task => {
      console.log(`  ${formatTask(task)}`);
    });
    
    console.log('\nFinal Statistics:\n');
    const stats = await taskManager.stats();
    
    console.log(`  Total tasks: ${stats.total}`);
    console.log(`  \n  Status breakdown:`);
    console.log(`    Open: ${stats.byStatus.open}`);
    console.log(`    Done: ${stats.byStatus.done}`);
    
    console.log(`  \n  Priority breakdown:`);
    console.log(`    Low:    ${stats.byPriority.low}`);
    console.log(`    Medium: ${stats.byPriority.medium}`);
    console.log(`    High:   ${stats.byPriority.high}`);
    
    console.log(`  \n  Actions performed:`);
    for (const [action, count] of Object.entries(stats.actionMetrics)) {
      console.log(`    ${action}: ${count}`);
    }
    
    console.log('\nDemo completed successfully!');
    
  } catch (error) {
    console.error('\nError:', error.message);
  }
}

runDemo();