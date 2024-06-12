/*
    Return longest word in a string
*/

function findLongestWord(sentence) {
    arr = sentence.split(" ");
    res = arr[0];
    for (i = 1; i < arr.length; i++) {
        if (arr[i].length > res.length) {
            res = arr[i];
        }
    }

    return res;
}

str = "The quick brown fox is jumping over the lazy dog";
res = findLongestWord(str);

console.log(res);