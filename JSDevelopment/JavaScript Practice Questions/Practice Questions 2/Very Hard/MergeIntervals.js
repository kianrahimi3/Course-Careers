/*
    merge all overlapping intervals from a given collection of invtervals.
*/

function mergeIntervals(intervals) {
    intervals = intervals.sort((a, b) => {
        return a[0] - b[0];
    })
    
    i = 0;
    nextIndex = 1;
    arr = [];

    start = intervals[i][0];
    end = intervals[i][1];
    while (i < intervals.length) {
        if (intervals[nextIndex] == undefined) {
            if (intervals[nextIndex-1][1] > end)
                var push = [start, intervals[nextIndex-1][1]]
            else
                var push = [start, end];
            arr.push(push);
            break;
        }

        if (intervals[nextIndex][0] < end && intervals[nextIndex[0] > start]) {
            if (intervals[nextIndex][1] > end) {
                end = intervals[nextIndex][1];
                console.log("end", end);
            }
        }
        else if (intervals[nextIndex][1] > end) {
            if (intervals[nextIndex][0] > end) {

                arr.push([start, end]);
                start = intervals[nextIndex][0];
                end = intervals[nextIndex][1];

                console.log(start, end);
            }
            else {
                end = intervals[nextIndex][1];
            }
        }

        nextIndex++;
    }

    //console.log(intervals);
    return arr;
}

const intervals = [[2, 6], [1, 3], [8, 10], [15, 18], [18, 21]]
var result = mergeIntervals(intervals);
console.log(result);