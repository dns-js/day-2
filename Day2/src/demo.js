
import { createTaskApp } from './index.js';
import { formatTask } from './utils/format.js'; 

async function runDemo() {
    console.log("--- START TASK MANAGER DEMO ---");

    // 1. Inisialisasi Aplikasi
    const { taskManager } = createTaskApp();
    console.log("✅ Aplikasi berhasil diinisialisasi.\n");

    const newTasksData = [
        {
            title: "Setup Task Manager Demo",
            dueDate: "2025-12-17",
            priority: "High"
        },
        {
            title: "Review Coding Interview Questions",
            dueDate: "2025-12-18",
            priority: "Medium"
        },
        {
            title: "Buy coffee beans",
            dueDate: "2025-12-16",
            priority: "Low"
        }
    ];

    // --- STEP 1: Adds 3 tasks ---
    console.log("--- 1. MENAMBAH 3 TASK BARU ---");
    const createdTasks = [];

    for (const data of newTasksData) {
        const task = await taskManager.addTask(data);
        createdTasks.push(task);
        console.log(`Berhasil tambah: "${task.title}"`);
    }
    const [task1, task2, task3] = createdTasks; 

    // --- STEP 2: Lists tasks ---
    console.log("\n--- 2. DAFTAR TASK SAAT INI ---");
    const allTasks = await taskManager.listTasks();
    
    if (allTasks.length === 0) {
        console.log("Belum ada task.");
    } else {
        allTasks.forEach(task => {
            console.log(`- ${formatTask(task)}`);
        });
    }

    // --- STEP 3: Marks one task done ---
    if (task3) {
        console.log(`\n--- 3. MENYELESAIKAN TASK (ID: ${task3.id}) ---`);
        const doneTask = await taskManager.updateTask(task3.id, {
            status: "done"
        });
        
        if (doneTask) {
            console.log(`Status Task '${doneTask.title}' sekarang: ${doneTask.status}`);
        }
    }

    // --- STEP 4: Updates one task ---
    if (task1) {
        console.log(`\n--- 4. MENGUPDATE TASK (ID: ${task1.id}) ---`);
        console.log(`Sebelum: Priority ${task1.priority}, Due ${task1.dueDate}`);
        
        const updatedTask = await taskManager.updateTask(task1.id, {
            dueDate: "2025-12-30",
            priority: "Urgent" 
        });

        if (updatedTask) {
            console.log(`Sesudah: Priority ${updatedTask.priority}, Due ${updatedTask.dueDate}`);
        }
    }

    // --- STEP 5: Removes one task ---
    // Hapus task ke-2
    // if (task2) {
    //     console.log(`\n--- 5. MENGHAPUS TASK (ID: ${task2.id}) ---`);
    //     taskManager.removeTask(task2.id);
    //     console.log(`Task '${task2.title}' telah dihapus.`);
    // }

    // Verifikasi: Tampilkan daftar lagi untuk memastikan task2 hilang
    // console.log("\n(Verifikasi Daftar Setelah Hapus):");
    // const remainingTasks = await taskManager.listTasks();
    // remainingTasks.forEach(task => console.log(`- ${task.title} [${task.status}]`));


    // --- STEP 6: Prints stats ---
    console.log("\n--- 6. STATISTIK APLIKASI ---");
    const stats = await taskManager.stats();
    
    console.log(`Total Tasks : ${stats.total}`);
    console.log(`Status      : ${stats.progress} Open / ${stats.done} Done`);

    console.log("\n--- END TASK MANAGER DEMO ---");
}

runDemo().catch(err => console.error("ERROR CRITICAL:", err));
