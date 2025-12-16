

// import { formatTask } from './utils/format.js'; 

// // async function runDemo() {

// //     console.log("--- START TASK MANAGER DEMO ---");

// //     // 1. Inisialisasi Aplikasi
// //     const { taskManager } = createTaskApp();
// //     console.log("\n✅ Aplikasi berhasil diinisialisasi.");

// //     // --- Persiapan Data (Array of Objects) ---
// //     const dataPercobaan = [
// //         {
// //             title: "Setup Task Manager Demo",
// //             dueDate: "2025-12-17",
// //             priority: "High"
// //         },
// //         {
// //             title: "Review Coding Interview Questions",
// //             dueDate: "2025-12-18",
// //             priority: "Medium"
// //         },
// //         {
// //             title: "Buy coffee beans",
// //             dueDate: "2025-12-16",
// //             priority: "Low"
// //         }
// //     ];

// //     // --- 1. Menambah 3 Task Baru (Looping) ---
// //     console.log("\n--- 1. MENAMBAH 3 TASK BARU ---");
    
// //     // Kita simpan task yang sudah jadi agar bisa dipakai untuk tes update/delete nanti
// //     const createdTasks = [];

// //     // Loop dataPercobaan dan panggil addTask untuk setiap item
// //     dataPercobaan.forEach(data => {
// //         // PERBAIKAN: Menggunakan method .addTask()
// //         const newTask = taskManager.addTask(data);
// //         createdTasks.push(newTask);
// //         console.log(`Berhasil tambah: ${newTask.title}`);
// //     });

// //     // Ambil referensi task untuk tes selanjutnya
// //     const [task1, task2, task3] = createdTasks;

// //     // --- 2. List Tasks ---
// //     console.log("\n--- 2. DAFTAR TASK SAAT INI ---");
// //     // Gunakan await karena load dari file bersifat async
// //     const allTasks = await taskManager.listTasks(); 
// //     allTasks.forEach(task => {
// //         console.log(`- ${formatTask(task)}`);
// //     });

// //     // --- 3. Update Status (Selesai) ---
// //     // Pastikan task3 ada sebelum update
// //     if (task3) {
// //         console.log(`\n--- 3. MENYELESAIKAN TASK (ID: ${task3.id}) ---`);
// //         const doneTask = taskManager.updateTask(task3.id, {
// //             status: "DONE"
// //         });
// //         console.log(`Task Selesai: ${formatTask(doneTask)}`);
// //     }

// //     // --- 4. Update Data Lain (PATCH) ---
// //     if (task1) {
// //         console.log(`\n--- 4. MENGUPDATE TASK (ID: ${task1.id}) ---`);
// //         const updatedTask = taskManager.updateTask(task1.id, {
// //             dueDate: "2025-12-20",
// //             priority: "Urgent" 
// //         });
// //         console.log(`Task Diupdate: ${formatTask(updatedTask)}`);
// //     }

// //     // --- 5. Hapus Task ---
// //     if (task2) {
// //         console.log(`\n--- 5. MENGHAPUS TASK (ID: ${task2.id}) ---`);
// //         taskManager.removeTask(task2.id);
// //         console.log(`Task dihapus.`);
// //     }

// //     // --- 6. Print Stats ---
// //     console.log("\n--- 6. STATISTIK APLIKASI ---");
// //     const stats = taskManager.stats();
// //     console.log(`Total Tasks: ${stats.totalTasks}`);
// //     console.log(`Open vs Done: ${stats.openTasks} Open / ${stats.doneTasks} Done`);

// //     console.log("\n--- END TASK MANAGER DEMO ---");
// // }

// // // Jalankan Demo
// // runDemo().catch(error => {
// //     console.error("❌ ERROR GLOBAL:", error);
// // });

// import { createTaskApp } from './index.js';
// src/demo.js
import { createTaskApp } from './index.js';
import { formatTask } from './utils/format.js'; 

async function runDemo() {
    console.log("--- START TASK MANAGER DEMO ---");

    // 1. Inisialisasi Aplikasi
    const { taskManager } = createTaskApp();
    console.log("✅ Aplikasi berhasil diinisialisasi.\n");

    // Data yang akan dimasukkan
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
        // Kita gunakan await agar urutannya rapi
        const task = await taskManager.addTask(data);
        createdTasks.push(task);
        console.log(`Berhasil tambah: "${task.title}"`);
    }

    // Ambil referensi task untuk tes update/delete nanti
    // (Task 1, Task 2, Task 3 sesuai urutan array)
    const [task1, task2, task3] = createdTasks; 

    // --- STEP 2: Lists tasks ---
    console.log("\n--- 2. DAFTAR TASK SAAT INI ---");
    const allTasks = await taskManager.listTasks();
    
    if (allTasks.length === 0) {
        console.log("Belum ada task.");
    } else {
        allTasks.forEach(task => {
            // Pastikan formatTask menerima object task
            console.log(`- ${formatTask(task)}`);
        });
    }

    // --- STEP 3: Marks one task done ---
    // Kita coba selesaikan task ke-3 ("Buy coffee beans")
    if (task3) {
        console.log(`\n--- 3. MENYELESAIKAN TASK (ID: ${task3.id}) ---`);
        const doneTask = taskManager.updateTask(task3.id, {
            status: "DONE"
        });
        
        if (doneTask) {
            console.log(`Status Task '${doneTask.title}' sekarang: ${doneTask.status}`);
        }
    }

    // --- STEP 4: Updates one task ---
    // Update task ke-1: Ganti due date & priority
    if (task1) {
        console.log(`\n--- 4. MENGUPDATE TASK (ID: ${task1.id}) ---`);
        console.log(`Sebelum: Priority ${task1.priority}, Due ${task1.dueDate}`);
        
        const updatedTask = taskManager.updateTask(task1.id, {
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
    console.log("\n(Verifikasi Daftar Setelah Hapus):");
    const remainingTasks = await taskManager.listTasks();
    remainingTasks.forEach(task => console.log(`- ${task.title} [${task.status}]`));


    // --- STEP 6: Prints stats ---
    console.log("\n--- 6. STATISTIK APLIKASI ---");
    const stats = taskManager.stats();
    
    console.log(`Total Tasks : ${stats.totalTasks}`);
    console.log(`Status      : ${stats.openTasks} Open / ${stats.doneTasks} Done`);
    // Jika Anda sudah implementasi countsByPriority, bisa ditampilkan juga:
    // console.log(`Priority    :`, stats.countsByPriority);

    console.log("\n--- END TASK MANAGER DEMO ---");
}

// Jalankan dan tangkap error jika ada
runDemo().catch(err => console.error("❌ ERROR CRITICAL:", err));
// async function runSimpleTest() {
//     console.log("--- TEST 1: ADD SINGLE TASK ---");

//     const { taskManager } = createTaskApp();
//     console.log("Mencoba menambah task...");
    
//     try {
//         const newTask = await taskManager.addTask({
//             title: "Test Task 1",
//             priority: "High",
//             dueDate: "2025-01-01"
//         });

//         console.log("✅ Berhasil memanggil fungsi addTask.");
//         console.log("Output Task:", newTask);

//     } catch (error) {
//         console.error(" Gagal saat addTask:", error);
//     }
// }

// runSimpleTest();