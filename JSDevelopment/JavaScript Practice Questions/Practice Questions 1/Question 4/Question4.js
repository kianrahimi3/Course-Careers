/*
    For this program you define three variables:
    1. Target (a string you will manipulate)
    2. Delimiter (a single character)
    3. Spacing (a positive integer greater than 0)

    You can define these variables as constants at the top of your program. The idea is that you can
    manually change them before you run the code to change what the output will be.

    Your goal will be to print a new version of the target string that has the delimiter character
    between the spacing number of characters.
*/

let target = "coursecareers";
let delimiter = "|";
let spacing = 2;

let result = "";
for (let i = 0; i < target.length; i+=spacing) {
    if (i + spacing < target.length) {
        result += target.slice(i, i + spacing);
        result += delimiter;
    }
    else {
        result += target.slice(i);
    }
}

console.log(result);