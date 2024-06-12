let nums = [];

for (let i = 0; i < 3; i++) {
    let num = Number(prompt("Enter number " + (i+1) + ":"));
    nums.push(num);
}

let max = Math.max(...nums);
alert("The alrgest number was: " + max);