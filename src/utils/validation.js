const validateTaskInput = (input) =>{ 
    let title = input.title 
    let priority = input.priority 
    let due = input.due 
    
    if(title === undefined || title === null){ 
        throw new Error("Title harus diisi") 
    } if(typeof title !== "string") 
        { throw new Error("Title harus berupa karakter") 
    } if(title.length < 3)
        { throw new Error("Title minimal 3 karakter") 
    } 
    const valid = ["low","medium","high"] 
    if(priority === undefined || priority === null){ 
        priority = "medium" 
    } if(!valid.includes(priority)){ 
        throw new Error("Priority harus low, medium, high") 
    } 
    const date = /^\d{4}-\d{2}-\d{2}$/ 
    if(due !== undefined && due !== null){
    } if(!date.test(due)){ throw new Error("Format date harus YYYY-MM-DD") } 
    return{ 
        title, 
        priority, 
        due 
    } 
} 
console.log(validateTaskInput({title: "Belajar", priority: "high", due: "2025-12-20"}) );
const task2 = { title: "Hi", priority: "super", due: "2025-12-20" }