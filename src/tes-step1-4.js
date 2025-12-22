// import { validateTaskInput } from "./utils/validate.js";
// import { formatTask } from "./utils/format.js";
// import { createStore } from "./services/taskStore.js";
// import { createMetrics } from "./services/metrics.js";

// async function runTest() {
//   console.log("---1. test validasi===");
//   try {
//     validateTaskInput({ title: "Hai", priority: "rendah" });
//   } catch (e) {
//     console.log("sukses mendapatkan error", e.message);
//   }

//   console.log("\n---2. test format---");
//   const dummyTask = {
//     id: "t_123456",
//     title: "belajar ngoding",
//     status: "open",
//     priority: "high",
//     due: "2025-12-31",
//   };
//   console.log("tampilan: ", formatTask(dummyTask));

//   console.log("\n---3. test store (async)---");
//   const store = createStore();
//   await store.saveTasks([{ ...dummyTask }]);
//   const loaded = await store.loadTasks();
//   console.log("data dari file: ", loaded);

//   console.log("\n---4. test metrics---");
//   const metrics = createMetrics();
//   metrics.inc("add_task");
//   metrics.inc("update_task");
//   metrics.inc("delete_task");
//   console.log("statistik: ", metrics.snapshot());
// }
// runTest();
