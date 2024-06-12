/*
    Implemenet a class LRUCache that represent a Least Recently Used (LRU) cache with a maximum capacity.
    2 Operations: 
        1. get(key): Get value of the key if key exists in the cache, otherwise -1
        2. set(key, value): Sets or inserts the  value if the key is not already present. When cache reaches its capacity, it should invalidate the least recently used item before inserting the item.
*/

class LRUCache {
    capacity;
    cache;

    constructor(capacity) {
        this.capacity = capacity;
        this.cache = new Map();
    }

    get(key) {
        var temp = this.cache.get(key);
        if (temp == undefined)
            return -1;
        else {
            this.cache.delete(key);
            this.cache.set(key, temp);
            return temp;
        }
    }

    set(key, value) {
        if (this.cache.has(key))
            this.cache.delete(key);
        
        if (this.cache.size == this.capacity) {
            const del = this.cache.keys().next().value;
            this.cache.delete(del);
        }

        this.cache.set(key, value);
    }
}


const cache = new LRUCache(2);
cache.set(1, 1); // Cache is {1=1}
cache.set(2, 2); // Cache is {1=1, 2=2}
console.log(cache.get(1)); // returns 1
cache.set(3, 3); // LRU key was 2, evicts key 2, cache is {1=1, 3=3}
console.log(cache.get(2)); // returns -1 (not found)
cache.set(4, 4); // LRU key was 1, evicts key 1, cache is {4=4, 3=3}
console.log(cache.get(1)); // returns -1 (not found)
console.log(cache.get(3)); // returns 3
console.log(cache.get(4)); // returns 4