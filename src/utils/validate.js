
export const validateTaskInput = (input) => {
  if (!input) {
    throw new Error("Input must be an object.");
  }

  const { title, priority, due } = input;

  // Title validation
  if (typeof title !== 'string' || title.trim().length < 3) {
    throw new Error("Title is required and must be a string with at least 3 characters.");
  }

  // Priority validation
  // Note: Defaults are typically handled in the manager, checking validity here.
  if (priority !== undefined) {
    const validPriorities = ['low', 'medium', 'high'];
    if (!validPriorities.includes(priority)) {
      throw new Error(`Priority must be one of: ${validPriorities.join(', ')}.`);
    }
  }

  // Due date validation
  if (due !== undefined && due !== null) {
    // strict YYYY-MM-DD regex check
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(due)) {
      throw new Error("Due date must be in YYYY-MM-DD format or null.");
    }
    // Optional: check if it's a valid calendar date
    if (isNaN(new Date(due).getTime())) {
       throw new Error("Due date must be a valid date.");
    }
  }
};
