const VALID_PROPERTIES = ['low', 'medium', 'high'];
const DATE_REGEX = /^\d{4}-\d{4}-\d{2}$/;

export function validateTaskInput(input) {
    if(!input || typeof input !== 'object') {
        throw new Error('Input must be an Object!');
    }

    const {title, priority = 'medium', due = null} = input;

    if(!title) {
        throw new Error('Title is required!');
    }

    if(typeof title !== 'string') {
        throw new Error('Title must be a string!');
    }

    if(title.trim().length < 3) {
        throw new Error('Title must be at least 3 characters long');
    }

    if(!VALID_PROPERTIES.includes(priority)) {
        throw new Error('Priority must be low, medium, or high!');
    }

    if(due !== null) {
        if(typeof due !== 'string' || !DATE_REGEX.test(due)) {
            throw new Error('Due date must be YYYY-MM-DD or null');
        }
    }

    return {
        title: title.trim(),
        priority,
        due
    };
}