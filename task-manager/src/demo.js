import { createTaskApp } from "./index.js";
import { formatTask } from "./utils/format.js";

async function runDemo() {
    const {taskManager} = createTaskApp();

    try {
        console.log('----- ADD TASK -----');
        
        const task1 = await taskManager.addTask({
            title: 'Belajar JavaScript',
            priority: 'high'
        });

        const task2 = await taskManager.addTask({
            title: 'Belajar Node.JS',
            priority: 'medium'
        });

        const task3 = await taskManager.addTask({
            title: 'Review ES Modules',
            priority: 'low'
        });

        console.log('\n----- LIST TASKS -----');
        let tasks = await taskManager.listTasks();
        tasks.forEach(task => console.log(formatTask(task)));
        
        console.log('\n----- MARK ONE TASK DONE -----');
        await taskManager.markDone(task1.id);

        console.log('\n----- UPDATE ONE TASK -----');
        await taskManager.updateTask(task2.id, {
            priority: 'high'
        });
        
        console.log('\n----- REMOVE ONE TASK -----');
        await taskManager.removeTask(task3.id);

        console.log('\n----- FINAL TASK LIST -----');
        tasks = await taskManager.listTasks();
        tasks.forEach(task => console.log(formatTask(task)));

        console.log('\n----- STATS -----');
        const stats = await taskManager.stats();
        console.log(stats);
    } catch(err) {
        console.log("Error: ", err.message);
    }
}

runDemo()