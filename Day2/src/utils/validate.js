

function validateAllTasks(tasksArray) {

    const validPriorities = ["low", "medium", "high"];

    tasksArray.forEach((task) => {
        if (!task.title || typeof task.title !== "string" || task.title.trim().length < 3) {
            throw new Error(`Title diperlukan, harus string, dan minimal 3 karakter.`);
        }
        if (task.priority && !validPriorities.includes(task.priority)) {
            throw new Error(`Priority harus low, medium, atau high.`);
        }
        if (task.due !== null) {
            if (typeof task.due !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(task.due)) {
                throw new Error(`Due date harus berupa null atau string YYYY-MM-DD.`);
            }
            
            const dateObj = new Date(task.due);
            if (isNaN(dateObj.getTime())) {
                 throw new Error(`Due date telah berlalu.`);
            }
        }
    });
    return tasksArray; 
}
