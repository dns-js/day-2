import fs from "node:fs/promises";


// const DATA_PATH = path.resolve("");
const DATA_PATH = './data/tasks.json'

export const createStore = () => {
  return {
    async loadTasks() {
      try {
        const rawData = await fs.readFile(DATA_PATH, "utf-8");

        return JSON.parse(rawData);
      } catch (error) {
        error;
        return [];
      }
    },

    async saveTasks(tasks) {
      const textData = JSON.stringify(tasks, null, 2);

      await fs.writeFile(DATA_PATH, textData);
    },
  };
};
