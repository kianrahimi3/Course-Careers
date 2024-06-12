/*
    Return all unique characters in string
*/

function findUniqueCharacters(str) {
    unique = {}
    for (i = 0; i < str.length; i++) {
        if (str[i] in unique)
            unique[str[i]]++;
        else
            unique[str[i]] = 1;
    }

    ret = "";
    for (const key in unique) {
        if (unique[key] == 1)
            ret += key;
    }

    return ret
}

test = "bubble";
result = findUniqueCharacters(test);

console.log(result);