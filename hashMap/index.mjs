class HashMap {
    constructor(size = 16) {
        this.bucket = new Array(size);
        this.size = size;
        this.entriesCount = 0;
        this.loadFactor = 0.75;
    }

    hash(key) {
        let hashCode = 0;
        const primeNumber = 31;

        for (let i = 0; i < key.length; i++) {
            hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.size;
        }

        return hashCode;
    }

    set(key, value) {
        let index = this.hash(key);
        if (!this.bucket[index]) {
            this.bucket[index] = [];
        }

        let bucket = this.bucket[index];
        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i][0] === key) {
                bucket[i][1] = value;
                return;
            }
        }

        bucket.push([key, value]);
        this.entriesCount++;

        if (this.entriesCount / this.size >= this.loadFactor) {
            this.grow();
        }
    }

    get(key) {
        let index = this.hash(key);
        let bucket = this.bucket[index];
        if (bucket) {
            for (let i = 0; i < bucket.length; i++) {
                if (bucket[i][0] === key) {
                    return bucket[i][1];
                }
            }
        }

        return null;
    }

    has(key) {
        let index = this.hash(key);
        let bucket = this.bucket[index];
        if (bucket) {
            for (let i = 0; i < bucket.length; i++) {
                if (bucket[i][0] === key) {
                    return true;
                }
            }
        }

        return false;
    }

    remove(key) {
        let index = this.hash(key);
        let bucket = this.bucket[index];
        if (bucket) {
            for (let i = 0; i < bucket.length; i++) {
                if (bucket[i][0] === key) {
                    bucket.splice(i, 1);
                    this.entriesCount--;
                    return true;
                }
            }
        }

        return false;
    }

    length() {
        return this.entriesCount;
    }

    clear() {
        this.bucket = new Array(this.size);
        this.entriesCount = 0;
    }

    keys() {
        let keysArray = [];
        for (let i = 0; i < this.size; i++) {
            let bucket = this.bucket[i];
            if (bucket) {
                for (let j = 0; j < bucket.length; j++) {
                    keysArray.push(bucket[j][0]);
                }
            }
        }

        return keysArray;
    }

    values() {
        let valuesArray = [];
        for (let i = 0; i < this.size; i++) {
            let bucket = this.bucket[i];
            if (bucket) {
                for (let j = 0; j < bucket.length; j++) {
                    valuesArray.push(bucket[j][1]);
                }
            }
        }

        return valuesArray;
    }

    allEntries() {
        let entriesArray = [];
        for (let i = 0; i < this.size; i++) {
            let bucket = this.bucket[i];
            if (bucket) {
                for (let j = 0; j < bucket.length; j++) {
                    entriesArray.push([bucket[j][0], bucket[j][1]]);
                }
            }
        }

        return entriesArray;
    }

    grow() {
        let newSize = this.size * 2;
        let newBucket = new Array(newSize);

        for (let i = 0; i < this.size; i++) {
            let bucket = this.bucket[i];
            if (bucket) {
                for (let j = 0; j < bucket.length; j++) {
                    let key = bucket[j][0];
                    let value = bucket[j][1];
                    let newIndex = this.hash(key) % newSize;

                    if (!newBucket[newIndex]) {
                        newBucket[newIndex] = [];
                    }

                    newBucket[newIndex].push([key, value]);
                }
            }
        }

        this.bucket = newBucket;
        this.size = newSize;
    }
}

// Example usage
const map = new HashMap();
map.set('name', 'John');
map.set('age', 30);
console.log(map.get('name')); // Output: John
console.log(map.has('age')); // Output: true
console.log(map.keys()); // Output: ['name', 'age']
console.log(map.values()); // Output: ['John', 30]
console.log(map.allEntries()); // Output: [['name', 'John'], ['age', 30]]
map.remove('age');
console.log(map.length()); // Output: 1
map.clear();
console.log(map.length()); // Output: 0
