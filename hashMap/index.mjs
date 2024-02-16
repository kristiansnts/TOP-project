class HashMap {
    constructor(size = 16) {
        this.bucket = new Array(size)
        this.size = size
        this.entries = 0
    }

    hash(key) {
        let hashCode = 0
        const primeNumber = 31

        for(let i = 0; i < key.length; i++) {
            hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % 17
        }

        return hashCode
    }

    access(index) {
        if(index < 0 || index >= this.bucket.length) {
            throw new Error ("Trying to access index out of bound")
        }
    }

    set(key, value) {
        let index = this.hash(key)
        this.access(index)
        if(!this.bucket[index]) {
            this.bucket[index] = []
        }
        let bucket = this.bucket[index]
        for(let i = 0; i < bucket.length; i++) {
            if(bucket[i][0] === key) {
                bucket[i][1] = value
                return
            }
        }
        bucket.push([key, value])
        this.entries++
    }

    get(key) {
        const index = this.has(key)
        this.access(index)
        return this.bucket[index] || null
    }

    has(key) {
        return this.get(key) !== null
    }

    remove(key) {
        const index = this.has(key)
        this.access(index)
        if(!this.bucket[index]) {
            delete this.bucket[index]
            this.entries--
            return true
        }
        return false
    }

    length() {
        return this.entries
    }

    clear() {
        this.bucket = new Array(this.size)
        this.entries = 0
    }

    keys() {
        return this.bucket.reduce((keys, value, index) => {
            if(value !== undefined) {
                keys.push(index)
            }
            return keys
        }, [])
    }

    values() {
        return this.bucket.filter(value => value !== undefined)
    }

    entries() {
        return this.bucket.reduce((entries, value, index) => {
            if(value !== undefined) {
                entries.push([index, value])
            }
            return entries
        }, [])
    }

}

const map1 = new HashMap()
map1.get();