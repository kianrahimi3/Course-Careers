/*
    For this question you will write a JavaScript function called: mathIsFun . This function will have
    one parameter called “numberString”. The string will contain a set of numbers, all separated by
    |’s. Your job will be to determine all of the numbers in the string and return the largest number
    that can be created by adding two of the numbers. You should return this number from the
    function.
*/

let str = "-2|-4|-1|-1";
mathIsFun(str);

function mathIsFun(numberString) {
    let arr = numberString.split("|");
    arr = arr.map(Number);
    console.log(arr);

    let sum = -Infinity;
    for(let i = 0; i < arr.length; i++) {
        for(let j = i+1; j < arr.length; j++) {
            let temp = arr[i] + arr[j];
            sum = Math.max(sum, temp);
        }
    }

    console.log(sum);
}