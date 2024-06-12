/*
    Write a function that convers Celsius to Fahrenheit.
    F = C * 9/5 + 32
*/

function convertToFahrenheit(celsius) {
    fahrenheit = celsius * (9/5) + 32;
    return fahrenheit;
}

result = convertToFahrenheit(0);

console.log(result);