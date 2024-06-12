/*
    sort an array of numbers based on the frequency of the numbers, from highest to lowest
    if two have same frequency, sort those two in ascending order
*/

function customSort(arr) {
    let nums = {}
    for (const num of arr) {
        if (num in nums) 
            nums[num]++;
        else
            nums[num] = 1;
    }
    
   const array = Object.entries(nums);
   array.sort((a,b) => {
        let ret = b[1] - a[1];
        if (ret == 0)
            return a[0] - b[0];
        return ret;
   })

   let ret = [];
   for (const [key, value] of array) {
        for(let i = 0; i < value; i++) {
            ret.push(key);
        }
   }

   return ret;
}

arr = [8, 5, 5, 5, 5, 1, 1, 1, 4, 4];
var result = customSort(arr);
console.log(result);