import { createTaskApp } from "./index.js";
import { formatTask } from "./utils/format.js";

const runDemo = async () => {
  console.log("--- 🚀 DEMO APLIKASI TASK MANAGER ---");

  try {
    const { taskManager } = await createTaskApp();

    console.log("\n[1] Menambah Task...");
    const t1 = await taskManager.addTask({
      title: "Belajar Backend",
      priority: "high",
    });
    const t2 = await taskManager.addTask({
      title: "Beli Kopi",
      priority: "medium",
    });
    const t3 = await taskManager.addTask({
      title: "Hapus Saya Nanti",
      priority: "low",
    });
    console.log("✅ 3 Task berhasil ditambahkan.");

    console.log("\n[2] Daftar Semua Task:");
    const tasks = await taskManager.listTasks();
    tasks.forEach((t) => console.log(formatTask(t)));

    console.log(`\n[3] Menyelesaikan task: ${t1.title}...`);
    await taskManager.markDone(t1.id);

    console.log(`\n[4] Mengedit task: ${t2.title}...`);
    await taskManager.updateTask(t2.id, { title: "Beli Kopi Susu Gula Aren" });

    console.log(`\n[5] Menghapus task: ${t3.title}...`);
    await taskManager.removeTask(t3.id);

    console.log("\n[6] Daftar Task Terbaru:");
    const finalTasks = await taskManager.listTasks();
    finalTasks.forEach((t) => console.log(formatTask(t)));

    console.log("\n[7] Laporan Statistik:");
    console.log(taskManager.stats());
  } catch (error) {
    console.error("❌ TERJADI ERROR:", error.message);
  }
};

runDemo();
