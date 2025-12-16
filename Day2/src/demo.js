// src/demo.js

// import { createTaskApp } from './index.js'; // Import factory function
// import { formatTask } from './utils/format.js'; // Import formatter untuk tampilan

// // --- Fungsi Utama Demo ---
// async function runDemo() {
//     console.log("--- START TASK MANAGER DEMO ---");

//     // 1. Inisialisasi Aplikasi
//     const { taskManager } = createTaskApp();
//     console.log("\n✅ Aplikasi berhasil diinisialisasi.");

//     // --- 1. Adds 3 tasks ---
//     const newTasksData = [
//         {
//             title: "Setup Task Manager Demo",
//             dueDate: "2025-12-17",
//             priority: "High"
//         },
//         {
//             title: "Review Coding Interview Questions",
//             dueDate: "2025-12-18",
//             priority: "Medium"
//         },
//         {
//             title: "Buy coffee beans",
//             dueDate: "2025-12-16",
//             priority: "Low"
//         }
//     ];
//     console.log(`Ditambahkan: ${task1.title}, ${task2.title}, ${task3.title}`);

//     // --- 2. Lists tasks ---
//     const allTasks = await taskManager.getTasks(); 
    
//     allTasks.forEach(task => { // Sekarang ini akan berjalan karena allTasks berisi data
//         console.log(`- ${formatTask(task)}`);
//     });

//     // --- 3. Marks one task done (Selesai) ---
//     console.log(`\n--- 3. MENYELESAIKAN TASK (ID: ${task3.id}) ---`);
//     const doneTask = taskManager.updateTask(task3.id, {
//         status: "DONE"
//     });
//     console.log(`Task Selesai: ${formatTask(doneTask)}`);

//     // --- 4. Updates one task (PATCH Logic) ---
//     // Mengubah due date & priority task 1, status/title tidak diubah
//     console.log(`\n--- 4. MENGUPDATE TASK (ID: ${task1.id}) ---`);
//     const updatedTask = taskManager.updateTask(task1.id, {
//         dueDate: "2025-12-20",
//         priority: "Urgent" 
//     });
//     console.log(`Task Diupdate: ${formatTask(updatedTask)}`);

//     // --- 5. Removes one task ---
//     console.log(`\n--- 5. MENGHAPUS TASK (ID: ${task2.id}) ---`);
//     taskManager.deleteTask(task2.id);
//     console.log(`Task dihapus.`);

//     // Verifikasi setelah penghapusan
//     console.log("\n--- DAFTAR TASK SETELAH HAPUS ---");
//     taskManager.getTasks().forEach(task => {
//         console.log(`- ${formatTask(task)}`);
//     });

//     // --- 6. Prints stats ---
//     console.log("\n--- 6. STATISTIK APLIKASI ---");
//     const stats = taskManager.getStats();
//     console.log(`Total Tasks: ${stats.totalTasks}`);
//     console.log(`Open vs Done: ${stats.openTasks} Open / ${stats.doneTasks} Done`);
//     console.log(`Counts by Priority:`, stats.priorityCounts);
//     console.log(`Action Usage Snapshot:`, stats.actionUsage);

//     // --- Testing Error Handling (Optional, tapi disarankan) ---
//     console.log("\n--- ERROR HANDLING TEST ---");
//     try {
//         // Mencoba menghapus task yang tidak ada (harus memunculkan error yang readable)
//         taskManager.deleteTask("non-existent-id-999");
//     } catch (error) {
//         // Output: Errors are readable
//         console.error(`ERROR CATCHED (Expected): ${error.message}`);
//     }

//     console.log("\n--- END TASK MANAGER DEMO ---");
// }

// runDemo();

// src/demo.js

import { createTaskApp } from './index.js';
import { formatTask } from './utils/format.js'; 

async function runDemo() {
    console.log("--- START TASK MANAGER DEMO ---");

    // 1. Inisialisasi Aplikasi
    const { taskManager } = createTaskApp();
    console.log("\n✅ Aplikasi berhasil diinisialisasi.");

    // --- Persiapan Data (Array of Objects) ---
    const dataPercobaan = [
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

    // --- 1. Menambah 3 Task Baru (Looping) ---
    console.log("\n--- 1. MENAMBAH 3 TASK BARU ---");
    
    // Kita simpan task yang sudah jadi agar bisa dipakai untuk tes update/delete nanti
    const createdTasks = [];

    // Loop dataPercobaan dan panggil addTask untuk setiap item
    dataPercobaan.forEach(data => {
        // PERBAIKAN: Menggunakan method .addTask()
        const newTask = taskManager.addTask(data);
        createdTasks.push(newTask);
        console.log(`Berhasil tambah: ${newTask.title}`);
    });

    // Ambil referensi task untuk tes selanjutnya
    const [task1, task2, task3] = createdTasks;

    // --- 2. List Tasks ---
    console.log("\n--- 2. DAFTAR TASK SAAT INI ---");
    // Gunakan await karena load dari file bersifat async
    const allTasks = await taskManager.listTasks(); 
    allTasks.forEach(task => {
        console.log(`- ${formatTask(task)}`);
    });

    // --- 3. Update Status (Selesai) ---
    // Pastikan task3 ada sebelum update
    if (task3) {
        console.log(`\n--- 3. MENYELESAIKAN TASK (ID: ${task3.id}) ---`);
        const doneTask = taskManager.updateTask(task3.id, {
            status: "DONE"
        });
        console.log(`Task Selesai: ${formatTask(doneTask)}`);
    }

    // --- 4. Update Data Lain (PATCH) ---
    if (task1) {
        console.log(`\n--- 4. MENGUPDATE TASK (ID: ${task1.id}) ---`);
        const updatedTask = taskManager.updateTask(task1.id, {
            dueDate: "2025-12-20",
            priority: "Urgent" 
        });
        console.log(`Task Diupdate: ${formatTask(updatedTask)}`);
    }

    // --- 5. Hapus Task ---
    if (task2) {
        console.log(`\n--- 5. MENGHAPUS TASK (ID: ${task2.id}) ---`);
        taskManager.removeTask(task2.id);
        console.log(`Task dihapus.`);
    }

    // --- 6. Print Stats ---
    console.log("\n--- 6. STATISTIK APLIKASI ---");
    const stats = taskManager.stats();
    console.log(`Total Tasks: ${stats.totalTasks}`);
    console.log(`Open vs Done: ${stats.openTasks} Open / ${stats.doneTasks} Done`);

    console.log("\n--- END TASK MANAGER DEMO ---");
}

// Jalankan Demo
runDemo().catch(error => {
    console.error("❌ ERROR GLOBAL:", error);
});