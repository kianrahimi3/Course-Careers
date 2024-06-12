vowels = ["a", "e", "i", "o", "u"];

function countVowelsAndConsonants(inputString) {
    count = {
        "vowels": 0,
        "consonants": 0
    };

    for (i in inputString) {
        if (isNaN(inputString[i])) {
            if (vowels.includes(inputString.charAt(i).toLowerCase())) {
                count["vowels"]++;
            }
            else
                count["consonants"]++;
        }
    }
    return count;
}

test = countVowelsAndConsonants("ProgrammingInJavaScript");
console.log(test);