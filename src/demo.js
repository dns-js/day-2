import { createTaskApp } from './index.js';
import { formatTask } from './utils/format.js';

console.log('=== Task Manager Demo ===');

const { taskManager } = createTaskApp();

try {
    // 1. add 3 tasks
    const t1 = await taskManager.addTask({
        title: 'Javascript tutor',
        priority: 'high',
    });

    const t2 = await taskManager.addTask({
        title: 'Mengerjakan tugas',
        priority: 'medium',
});


    const t3 = await taskManager.addTask({
        title: 'Review code',
        priority: 'low',
});

    console.log('-- Tasks added --');
    [t1, t2, t3].forEach(t => console.log(formatTask(t)));


    // 2. List all tasks
    console.log('-- All tasks --');
    const allTasks = await taskManager.listTasks();
    allTasks.forEach(t => console.log(formatTask(t)));

    // 3. Mark one task done
    await taskManager.markDone(t1.id);
    console.log(`-- Task marked done: ${t1.id} --`);

    // 4. Update one task
    await taskManager.updateTask(t2.id, { priority: 'high' });
    console.log(`-- Task updated: ${t2.id} --`);


    // 5. Remove one task
    await taskManager.removeTask(t3.id);
    console.log(`-- Task removed: ${t3.id} --`);


    // 6. Print final tasks
    console.log('-- Final task list --');
    const finalTasks = await taskManager.listTasks();
    finalTasks.forEach(t => console.log(formatTask(t)));

    // 7. Stats
    const stats = await taskManager.stats();


    const total = finalTasks.length;
    const open = finalTasks.filter(t => t.status === 'open').length;
    const done = finalTasks.filter(t => t.status === 'done').length;


    const byPriority = finalTasks.reduce((acc, t) => {
        acc[t.priority] = (acc[t.priority] || 0) + 1;
        return acc;
    }, {});

    console.log('-- Stats --');
    console.log('Total tasks:', total);
    console.log('Open vs Done:', { open, done });
    console.log('By priority:', byPriority);
    console.log('Action metrics:', stats);

}   catch (err) {
    console.error('ERROR:', err.message);
}