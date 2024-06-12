/*
    For this question you will write a JavaScript function called: friends . This function will accept a
    parameter called "people" that contains a list of objects. These objects will have two properties,
    the first is “name" and the second is a list of strings called “friends". Your job will be to determine
    which person has the most loyal friends. A loyal friend is one that a person has in their friends
    list that also has that person in their friends list. For example, if John has Susan in his friends list
    and Susan has John in her friends list then they are “loyal friends". On the contrary, if John has
    Mike in his friends list but Mike does not have John in his friends list they are not loyal friends.
*/


let people = [
    {"name": "Tim", "friends": ["John", "Sally"]},
    {"name": "John", "friends": ["Tim", "Mike", "Sally"]},
    {"name": "Mike", "friends": ["John"]},
    {"name": "Sally", "friends": ["Tim", "John"]}
    ];

let maxLoyalFriends = {
    "name": "",
    "friends": 0
};

let friends = {};

for (const person of people) {
    friends[person["name"]] = {"friends": person["friends"], loyalFriends: 0};
}

for (const person of people ) {
    for (const friend of person["friends"]) {
        if (friends[friend]["friends"].includes(person["name"])) {
            friends[person["name"]]["loyalFriends"]++;

            if (friends[person["name"]]["loyalFriends"] > maxLoyalFriends["friends"]) {
                maxLoyalFriends["name"] = person["name"];
                maxLoyalFriends["friends"] = friends[person["name"]]["loyalFriends"];
            }

        }
        
    }
}

console.log(maxLoyalFriends);