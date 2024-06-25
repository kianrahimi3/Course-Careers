function example(n) {
    if (n === 1) return 1;

    let total = 0;

    for (let x = 0; x < n; x++) {
        total += example(n-1);
    }

    return total;
}

console.log("example:");
console.log(example(3));