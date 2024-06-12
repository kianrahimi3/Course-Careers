/*
    Create a function sumEvenNumbers that takes an array of numbers as a parameter and
    returns the sum of all the even numbers in the array.
*/

function sumEvenNumbers(numbers) {
    sum = 0;
    try {
        
        for (i in numbers) {
            try {
                number = Number(numbers[i]);
                if (numbers[i] % 2 == 0) {
                    sum += numbers[i];
                }
            }
            catch {

            }
            
        }
        return sum;
    }
    catch (error) {
        throw Error(error)
    }
}

test = [11,22,33,44,55]
sum = sumEvenNumbers(test);

console.log(sum);