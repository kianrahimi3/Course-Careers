/*
    Return largest age difference amongst all pairs of tuples
*/

function findLargestAgeDifference(agePairs) {
    difference = 0;
    
    for (i = 0; i < agePairs.length; i++) {
        result = Math.max(...agePairs[i]) - Math.min(...agePairs[i]);
        if (result > difference)
            difference = result;
    }
    return difference;
}

test = [[15, 5], [25, 10], [60, 40], [100, 60]];
console.log(findLargestAgeDifference(test));