/*
    given array of itneger numbers and a target sum, 
    identify all pairs of indices whose values sum up to the target sum
*/

function findUniqueIndexPairs(numbers, targetSum) {
    let nums = {};
    let arr = [];

    for (let i = 0; i < numbers.length; i++) {
        let diff = targetSum - numbers[i];
        if (diff in nums) {
            arr.push([nums[diff], i])
        }
        nums[numbers[i]] = i;
    }
    return arr;
}

const numbers = [0, 0, 0, 0, 1, -1];
const targetSum = 0;
var result = findUniqueIndexPairs(numbers, targetSum);

console.log(result);