import Node from "./LinkNode.js"

class LinkedList {
    constructor() {
        this.headNode = null
        this.tailNode = null
        this.length = 0
    }

    append(value) {
        let newNode = new Node(value)
        if(this.headNode == null){
            this.headNode = newNode
            this.tailNode = newNode
            return this
        }
        let current = this.headNode
        while(current.nextNode !== null){
            current = current.nextNode
        }
        current.nextNode = newNode
        this.tailNode = newNode
        this.length++
        return this
    }

    prepend(value) {
        let newNode = new Node(value)
        if(this.headNode == null){
            this.headNode = newNode
            this.tailNode = newNode
        } else {
            newNode.nextNode= this.headNode
            this.headNode = newNode
        }
        this.length++
        return this
    }

    size() {
        return this.length + 1
    }

    head() {
        return this.headNode
    }

    tail() {
        return this.tailNode
    }

    at(index) {
        if(index < 0) return null
        let count = 0
        let current = this.headNode
        while(current) {
            if(count === index) {
                return current
            }
            count++
            current = current.nextNode
        }
        return null
    }

    pop() {
        if(!this.headNode) {
            return
        }

        let current = this.headNode
        while(current.nextNode !== this.tailNode){
            current = current.nextNode
        }

        current.nextNode = null
        this.tailNode = current
        this.length--
    }

    contains(value) { 
        let count = 0
        let current = this.headNode
        while(current) {
            if(value === current.value) {
                return true
            }
            count++
            current = current.nextNode
        }
        return false
    }

    find(value) {
        let count = 0
        let current = this.headNode
        while(current) {
            if(value === current.value) {
                return current
            }
            count++
            current = current.nextNode
        }
        return null
    }

    toString() {
        let current = this.headNode
        let msg = ''
        while(current) {
            if(current !== null) {
                msg += `( ${current.value} ) -> `
            }
            current = current.nextNode
        }
        msg += 'null'
        return msg
    }

    insertAt(value, index) {
        let newNode = new Node(value)

        if(index == 0) {
            newNode.nextNode = this.headNode
            this.headNode = newNode
            if(!this.tailNode) {
                this.tailNode = newNode
            }
        } else {
            let count = 0
            let current = this.headNode
            let prev = null

            while(current && count < index) {
                prev = current
                count++
                current = current.nextNode
            }

            newNode.nextNode = current
            prev.nextNode = newNode

            if(!current) {
                this.tailNode = newNode
            }
        }
        this.length++
    }

    removeAt(index) {
        if(!this.headNode) {
            return
        }

        if(index === 0) {
            this.headNode = this.headNode.nextNode
            if(!this.headNode) {
                this.tailNode = null
            }
            this.length--
            return
        }

        let count = 0
        let current = this.headNode
        let prev = null

        while(current && count < index){
            prev = current
            count++
            current = current.nextNode
        }

        if(!current) {
            return
        }

        prev.nextNode = current.nextNode
        if(!prev.nextNode) {
            this.tailNode = prev
        }

        this.length--
    }
}

export default LinkedList