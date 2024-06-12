/*
    The program should declare two variables: min and max. These variables should store two
    positive numbers that you can change before running the code. Your code should print an array
    to the console that contains all of the values from min -> max (inclusive).

    You can define these variables as constants at the top of your program. The idea is that you can
    manually change them before you run the code to change what the output will be.
*/

let min = 0;
let max = 10;

let nums = [];
for (let i = min; i <= max; i++) {
    nums.push(i);
}

console.log(nums);