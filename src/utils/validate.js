export function validateTaskInput(input) {
    if (!input || typeof input !== 'object') {
        throw new Error('Input harus berupa object');
    }

    const { title, priority = 'medium', due = null } = input;

    // title wajib, string, minimal 3 karakter
    if (!title || typeof title !== 'string' || title.trim().length < 3) {
        throw new Error('title wajib diisi minimal 3 karakter');
    }

    // priority: low | medium | high
    const allowedPriorities = ['low', 'medium', 'high'];
    if (!allowedPriorities.includes(priority)) {
        throw new Error('Priority harus low, medium, atau high');
    }

    // due: YYYY-MM-DD atau null
    if (due !== null) {
        const regex = /^\d{4}-\d{2}-\d{2}$/;
        if (!regex.test(due)) {
            throw new Error('Due date harus format YYYY-MM-DD atau null');
        }
    }


    // return data yang sudah bersih
    return {
        title: title.trim(),
        priority,
        due,
    };
}