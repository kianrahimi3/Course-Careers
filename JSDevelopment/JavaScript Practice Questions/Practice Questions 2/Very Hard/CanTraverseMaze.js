/*
    You are given a 2D grid representing a maze, where:
        ● 'S' represents the starting point.
        ● 'F' represents the finish point.
        ● '.' represents an open path that can be traveled.
        ● '#' represents a wall that cannot be passed through.
    Write a JavaScript function named canTraverseMaze that takes two arguments: a 2D
    grid (array of strings) representing the maze, and a string of directions to attempt to
    traverse the maze. The directions are given as a string consisting of the letters 'N'
    (north), 'S' (south), 'E' (east), and 'W' (west). The function should return true if the
    directions lead from the start to the finish point without running into walls or going out of
    bounds, and false otherwise.
*/

function findStartingPosition(maze) {
    for(let i = 0; i < maze.length; i++) {
        for (let j = 0; j < maze[i].length; j++) {
            if (maze[i][j] === "S") {
                arr = [i, j];
                return arr;
            }
        }
    }
}

function nextPosition(pos, movement) {
    let newPosition = pos;

    if (movement === "S")
        newPosition = [newPosition[0]+= 1, newPosition[1]];
    else if (movement === "N")
        newPosition = [newPosition[0] -= 1, newPosition[1]];
    else if (movement === "E")
        newPosition = [newPosition[0], newPosition[1] += 1];
    else if (movement === "W")
        newPosition = [newPosition[0], newPosition[1] -= 1];

    return newPosition;
}

function canTraverseMaze(maze, directions) {
    pos = findStartingPosition(maze);

    for (let i = 0; i < directions.length; i++) {
        pos = nextPosition(pos, directions[i]);

        if (pos[0] < 0 || pos[0] >= maze.length)
            return false;
        else if (pos[1] < 0 || pos[1] >= maze.length)
            return false;
        else if (maze[pos[0]][pos[1]] == "#")
            return false;
        else if (maze[pos[0]][pos[1]] == "F")
            return true;

    }
    return false;
}

const maze = [
    "S...",
    ".#.#",
    ".#.#",
    "...F"
    ];
const directions = "EESSSWWNNNEESSSE";
var result = canTraverseMaze(maze, directions);
console.log(result);