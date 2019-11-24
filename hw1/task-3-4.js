const students = [
  {
    name: 'Nam',
    age: 24,
    gender: 'male',
  },
  {
    name: 'Mai',
    age: 22,
    gender: 'female',
  },
  {
    name: 'Trang',
    age: 23,
    gender: 'female',
  },
  {
    name: 'An',
    age: 20,
    gender: 'male',
  },
  {
    name: 'Thien',
    age: 27,
    gender: 'male',
  },
];

let maleStudent = 0;
let femaleStudent = 0;
students.forEach((value, index)  => {
  switch (value.gender) {
    case 'male':
      maleStudent += 1;
      break;
    case 'female':
      femaleStudent += 1;
    default:
      break;
  }
})

console.log("\n\n=============== TASK 3 ===============\n")
console.log("Number of male student: ", maleStudent)
console.log("Number of female student: ", femaleStudent)


console.log("\n\n=============== TASK 4 ===============\n")

let nameArr = [];
students.forEach((value, index)  => {
  nameArr.push(value.name)
})

console.log("Name Array: ", nameArr)

