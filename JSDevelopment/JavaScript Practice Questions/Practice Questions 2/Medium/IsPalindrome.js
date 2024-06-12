/*
    checks if string is a palindrome. 
    Palindrome -> word, phrase, number, or sequence of characters that reads the same forward and backward
                    ignoring spaces, punctuation, and capitalization
*/

function isPalindrome(str) {
    var punctuation = /[\.,?! ]/g;

    str = str.replace(punctuation, "");
    str = str.toLowerCase();

    let l = 0;
    let r = str.length - 1;

    while (l < r) {
        if (str[l] == str[r]) {

            l++;
            r--;
        } 
        else {
            console.log(str[l], str[r]);
            return false;
        }
    }
    return true;
}

let str = "A man, a plan, a canal, Panama";

var result = isPalindrome(str);

console.log(result);