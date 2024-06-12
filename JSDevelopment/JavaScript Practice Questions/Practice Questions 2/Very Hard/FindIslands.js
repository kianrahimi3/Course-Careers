/*
    count # islands in a given 2D map
    island = group of adjacent lands, where "land" is represented by 1 and "water" is represented by 0.
*/


function checkIfIsland(map, pos) {
    if (map[pos[0]][pos[1]] == 1) {
        let i = pos[0];
        let j = pos[1];
        map[i][j] = 3;

        let temp;
        if ( i-1 >= 0) {
            if ( checkIfIsland(map, [i-1,j]) ) {
                //map[i-1][j] = 3;
                return true;
            }

        }
        if ( j-1 >= 0) {
            if (checkIfIsland(map, [i,j-1])) {
                //map[i][j-1] = 3;
                return true;
            }
        }
        if ( i+1 < map.length) {
            if (checkIfIsland(map, [i+1,j])) {
                //map[i+1][j] = 3;
                return true;
            }
        }
        if ( j+1 < map[i].length) {
            if (checkIfIsland(map, [i,j+1])) {
                //map[i][j+1] = 3;
                return true;
            }
        }
        return true;
    }
    return false;
}


function findIslands(map) {
    let count = 0;

    for(let i = 0; i < map.length; i++) {
        for (let j = 0; j < map[i].length; j++) {
            var temp = checkIfIsland(map, [i,j]);
            if (temp)
                count++;
        }
    }
    return count;
}

const map = [
    [1, 1, 0, 0, 0],
    [0, 1, 0, 0, 1],
    [1, 0, 0, 1, 1],
    [0, 0, 0, 0, 0],
    [1, 0, 1, 0, 1]
    ];
var result = findIslands(map)
console.log(result);