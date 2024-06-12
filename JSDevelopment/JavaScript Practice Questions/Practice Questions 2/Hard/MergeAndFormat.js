/*
    Take in 2 parameters:
        1. array of objects representing books: title, author, year
        2. format

    Function should books with the same title and author but different years into single entry
*/

function mergeAndFormat(books, format) {
    result = {}
    
    for (const book of books) {
        if (!(book.title in result)) {
            result[book.title] = {
                author: book.author,
                year: [book.year]
            }
        }
        else {
            result[book.title].year.push(book.year);
            //result[book.title].year.push.sort();
        }
    }

    arr = []
    for (const [key, value] of Object.entries(result)) {
        if (format == "object") {
            arr.push({
                title: key,
                author: value.author,
                year: value.year
            });

            

        }
        else {
            str = key + " by " + value.author + " (";
            for (let i = 0; i < value.year.length-1; i++) {
                str += value.year[i] + ", ";
            }
            str += value.year[value.year.length-1] + ")";
            arr.push(str);
        }
        
    }

    return arr;
}

const books = [
    { title: "To Kill a Mockingbird", author: "Harper Lee", year:
    1960 },
    { title: "To Kill a Mockingbird", author: "Harper Lee", year:
    2015 },
    { title: "Brave New World", author: "Aldous Huxley", year: 1932
    },
    { title: "The Catcher in the Rye", author: "J.D. Salinger", year:
    1951 }
    ];

var result = mergeAndFormat(books, "object");

console.log(result);