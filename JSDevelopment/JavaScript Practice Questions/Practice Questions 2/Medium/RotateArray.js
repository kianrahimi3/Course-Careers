/*
    Rotate an array by k steps to the right
*/

function rotateArray(array, k) {

    for (let i = 0; i < k; i++) {
        let temp = array.pop();
        array.unshift(temp);
    }
    
    console.log(array);
}

arr = [1, 2, 3, 4, 5];
k = 8;

var result = rotateArray(arr, k);