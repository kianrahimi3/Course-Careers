/*
    The function should take in two ascending order arrays and return a new array that merges both input arrays into one
*/

function mergeSortedArrays(arr1, arr2) {
    arr = []
    let index1 = 0;
    let index2 = 0;

    while (index1 < arr1.length || index2 < arr2.length) {
        if(index1 == arr1.length) {
            arr.push(...arr2.slice(index2, arr2.length));
            break;
        }
        else if (index2 == arr2.length) {
            arr.push(...arr1.slice(index1, arr1.length));
            break;
        }


        if (arr2[index2] < arr1[index1]) {
            arr.push(arr2[index2]);
            index2++;
        }
        else {
            arr.push(arr1[index1]);
            index1++;
        }
        
    }

    console.log(arr);
}

arr1 = [1,3,5]
arr2 = [2,4,6]

mergeSortedArrays(arr1, arr2);