/*
    Write function that takes string and returns compressed version of the string
        - For each group of consecutive identical characters in the input string, replace that group with a single instance of the character followed by the # times it appears consecutively
        - If character appears only once consecutively, just include the character without a number following
        - should handle any ASCII char
*/

function compressString(str) {
    let newstr = "";
    let l = 0;
    let r = 1;

    while (l < str.length) {
        if (str[l] === str[r]) {
            r++;
        }
        else {
            let diff = r - l;
            if (diff > 1) {
                newstr += str[l] + diff;
            }
            else {
                newstr += str[l];
            }
            l = r;
        }
        
    }
    return newstr;
}

let str = "wwwwaaadexxxxxx";
var result = compressString(str);

console.log(result);