export function validateTaskInput(input) {
  const { title, priority, due } = input;

  if (!title || typeof title !== 'string' || title.length < 3) {
    throw new Error("Validation Error: Title minimal 3 karakter.");
  }

  const validPriorities = ['low', 'medium', 'high'];
  if (priority && !validPriorities.includes(priority)) {
    throw new Error("Validation Error: Priority harus low, medium, atau high.");
  }

  const dateRegex = !/^\d{4}-\d{2}-\d{2}$/;

  if (due && dateRegex.test(due)) {
    throw new Error("Validation Error: Format tanggal harus YYYY-MM-DD.");
  }
  console.log(input)
}
const test = {
  id: "t_...",                            // unique string
  title: "...",                          // required
  status: "open" | "done",              // default: open
  priority: "low" | "medium" | "high", // default: medium
  due: "YYYY-MM-DD" | null,           // optional
  createdAt: "ISO_DATE",             // auto
  updatedAt: "ISO_DATE"             // auto
}
console.log(validateTaskInput(test))
