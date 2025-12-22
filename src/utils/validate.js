export const validateTaskInput = (input) => {
  if (
    !input.title ||
    typeof input.title !== "string" ||
    input.title.length < 3
  ) {
    throw new Error(
      "Validation Error: Title must be a string with at least 3 characters.",
    );
  }

  const validPriorities = ["low", "medium", "high"];

  if (input.priority && !validPriorities.includes(input.priority)) {
    throw new Error(
      `Validation Error: Priority must be one of: ${validPriorities.join(", ")}`,
    );
  }

  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (input.due && !dateRegex.test(input.due)) {
    throw new Error("Validation Error: Due date must be in YYYY-MM-DD format.");
  }

  // console.log(input);
};

// const test = {
//   id: "t_...", // unique string
//   title: "...", // required
//   status: "open" | "done", // default: open
//   priority: "low" | "medium" | "high", // default: medium
//   due: "YYYY-MM-DD" | null, // optional
//   createdAt: "ISO_DATE", // auto
//   updatedAt: "ISO_DATE", // auto
// };

// console.log(validateTaskInput(test));
