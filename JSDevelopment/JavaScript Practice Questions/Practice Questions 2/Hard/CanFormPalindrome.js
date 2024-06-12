/*
    Write function that checks if it is possible to for a palindrome from the given input string by rearranging its letters.
*/

function canFormPalindrome(str) {
    letters = new Set();

    for (const char of str) {
        if (letters.has(char)) {
            letters.delete(char);
        }
        else {
            letters.add(char);
        }

    }

    if (letters.size <= 1) // If size is 1, this could be the middle letter
        return true;
    else
        return false;
}

let str = "longerstringwithrepeatingcharactersbutnopossiblepalindrome";
var result = canFormPalindrome(str);
console.log(result);