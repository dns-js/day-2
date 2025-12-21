const VALID_PRIORITIES = ['low', 'medium', 'high'];
const VALID_STATUSES = ['open', 'done'];

export function validateTaskInput(input) {
  if (!input.title) {
    throw new Error('Title is required');
  }

  if (typeof input.title !== 'string') {
    throw new Error('Title must be a string');
  }

  if (input.title.trim().length < 3) {
    throw new Error('Title must be at least 3 characters long');
  }

  if (input.priority) {
    if (!VALID_PRIORITIES.includes(input.priority)) {
      throw new Error('Priority must be: low, medium, or high');
    }
  }

  if (input.status) {
    if (!VALID_STATUSES.includes(input.status)) {
      throw new Error('Status must be: open or done');
    }
  }

  if (input.due !== undefined && input.due !== null) {
    const datePattern = /^\d{4}-\d{2}-\d{2}$/;
    if (!datePattern.test(input.due)) {
      throw new Error(
        'Due date must be in YYYY-MM-DD format (like 2025-12-31)',
      );
    }
  }

  return true;
}
