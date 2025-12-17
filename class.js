class User {
     constructor(name, age) {
          this.name = name;
          this.age = age;
     }

     greet() {
          return `Hello my ${name}, my age is ${this.age}`;
     }
}

const user1 = new User("hilman", 17);
const user2 = new User("theo", 17);

console.log("user", user1, user2);

class Student extends User {
     constructor(name, age, graduate) {
          super(name, age);
          this.gradute = graduate;
     }
}

const student1 = new Student("hilman", 99, 2199);
console.log("student1", student1);
