/*
    Take array of objects and perform filtering and transformation on the data.
        1. Filter out any person who is under 18 years old
        2. Transform the remaining objects into strings formatted as "<Name> is <Age> years old and loves <Hobby>"
*/

function filterAndTransform(people) {
    people = people.filter((o) => o.age > 17);
    people.map((obj) => `${obj.name} is ${obj.age} years old and loves ${obj.Hobby}`);

    return people;
}

const people = [
    { name: "Alice", age: 25, hobby: "painting" },
    { name: "Bob", age: 17, hobby: "coding" },
    { name: "Charlie", age: 32, hobby: "cycling" },
    { name: "Dave", age: 15, hobby: "gardening" }
    ];

var result = filterAndTransform(people);
console.log(result);