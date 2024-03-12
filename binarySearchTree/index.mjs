class Node {
    constructor(data) {
      this.data = data;
      this.left = null;
      this.right = null;
    }
  }
  
  class Tree {
    constructor(array) {
      this.root = this.buildTree(array);
    }
  
    buildTree(array) {
      const sortedArray = Array.from(new Set(array)).sort((a, b) => a - b);
      return this.buildBalancedTree(sortedArray, 0, sortedArray.length - 1);
    }
  
    buildBalancedTree(array, start, end) {
      if (start > end) {
        return null;
      }
  
      const mid = Math.floor((start + end) / 2);
      const node = new Node(array[mid]);
  
      node.left = this.buildBalancedTree(array, start, mid - 1);
      node.right = this.buildBalancedTree(array, mid + 1, end);
  
      return node;
    }
  
    prettyPrint(node, prefix = "", isLeft = true) {
      if (node === null) {
        return;
      }
      if (node.right !== null) {
        this.prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
      }
      console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
      if (node.left !== null) {
        this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
      }
    }
  
    insert(value) {
      this.root = this.insertNode(this.root, value);
    }
  
    insertNode(node, value) {
      if (node === null) {
        return new Node(value);
      }
  
      if (value < node.data) {
        node.left = this.insertNode(node.left, value);
      } else if (value > node.data) {
        node.right = this.insertNode(node.right, value);
      }
  
      return node;
    }
  
    deleteItem(value) {
      this.root = this.deleteNode(this.root, value);
    }
  
    deleteNode(node, value) {
      if (node === null) {
        return null;
      }
  
      if (value < node.data) {
        node.left = this.deleteNode(node.left, value);
      } else if (value > node.data) {
        node.right = this.deleteNode(node.right, value);
      } else {
        if (node.left === null && node.right === null) {
          return null;
        } else if (node.left === null) {
          return node.right;
        } else if (node.right === null) {
          return node.left;
        }
  
        const temp = this.findMinNode(node.right);
        node.data = temp.data;
        node.right = this.deleteNode(node.right, temp.data);
      }
  
      return node;
    }
  
    find(value) {
      return this.findNode(this.root, value);
    }
  
    findNode(node, value) {
      if (node === null) {
        return null;
      }
  
      if (value < node.data) {
        return this.findNode(node.left, value);
      } else if (value > node.data) {
        return this.findNode(node.right, value);
      } else {
        return node;
      }
    }
  
    findMinNode(node) {
      if (node.left === null) {
        return node;
      } else {
        return this.findMinNode(node.left);
      }
    }
  
    levelOrder(callback) {
      if (!this.root) {
        return [];
      }
  
      const result = [];
      const queue = [this.root];
  
      while (queue.length > 0) {
        const node = queue.shift();
        result.push(node.data);
  
        if (node.left !== null) {
          queue.push(node.left);
        }
  
        if (node.right !== null) {
          queue.push(node.right);
        }
      }
  
      if (callback) {
        result.forEach(callback);
      }
  
      return result;
    }
  
    inOrder(callback) {
      return this.traverseInOrder(this.root, callback);
    }
  
    traverseInOrder(node, callback) {
      if (node === null) {
        return [];
      }
  
      const result = [];
  
      result.push(...this.traverseInOrder(node.left, callback));
      if (callback) {
        callback(node.data);
      }
      result.push(node.data);
      result.push(...this.traverseInOrder(node.right, callback));
  
      return result;
    }
  
    preOrder(callback) {
      return this.traversePreOrder(this.root, callback);
    }
  
    traversePreOrder(node, callback) {
      if (node === null) {
        return [];
      }
  
      const result = [];
  
      if (callback) {
        callback(node.data);
      }
      result.push(node.data);
      result.push(...this.traversePreOrder(node.left, callback));
      result.push(...this.traversePreOrder(node.right, callback));
  
      return result;
    }
  
    postOrder(callback) {
      return this.traversePostOrder(this.root, callback);
    }
  
    traversePostOrder(node, callback) {
      if (node === null) {
        return [];
      }
  
      const result = [];
  
      result.push(...this.traversePostOrder(node.left, callback));
      result.push(...this.traversePostOrder(node.right, callback));
      if (callback) {
        callback(node.data);
      }
      result.push(node.data);
  
      return result;
    }
  
    height(node) {
      if (node === null) {
        return -1;
      }
  
      const leftHeight = this.height(node.left);
      const rightHeight = this.height(node.right);
  
      return Math.max(leftHeight, rightHeight) + 1;
    }
  
    depth(node) {
      if (node === null) {
        return 0;
      }
  
      let depth = 0;
      let current = node;
      while (current !== null) {
        depth++;
        current = current.parent;
      }
  
      return depth;
    }
  
    isBalanced() {
      return this.checkBalanced(this.root) !== -1;
    }
  
    checkBalanced(node) {
      if (node === null) {
        return 0;
      }
  
      const leftHeight = this.checkBalanced(node.left);
      if (leftHeight === -1) {
        return -1;
      }
  
      const rightHeight = this.checkBalanced(node.right);
      if (rightHeight === -1) {
        return -1;
      }
  
      if (Math.abs(leftHeight - rightHeight) > 1) {
        return -1;
      }
  
      return Math.max(leftHeight, rightHeight) + 1;
    }
  
    rebalance() {
      const values = this.inOrder();
      this.root = this.buildTree(values);
    }
  }
  
  // Driver script
  const getRandomInt = (max) => {
    return Math.floor(Math.random() * Math.floor(max));
  };
  
  const randomNumbers = Array.from({ length: 15 }, () => getRandomInt(100));
  
  const tree = new Tree(randomNumbers);
  
  console.log("Is balanced:", tree.isBalanced());
  console.log("Level order:");
  tree.levelOrder(console.log);
  console.log("Pre order:");
  tree.preOrder(console.log);
  console.log("Post order:");
  tree.postOrder(console.log);
  console.log("In order:");
  tree.inOrder(console.log);
  
  const unbalancedNumbers = Array.from({ length: 5 }, () => getRandomInt(200) + 100);
  unbalancedNumbers.forEach((num) => tree.insert(num));
  
  console.log("Is balanced after unbalancing:", tree.isBalanced());
  
  tree.rebalance();
  
  console.log("Is balanced after rebalancing:", tree.isBalanced());
  console.log("Level order after rebalancing:");
  tree.levelOrder(console.log);
  console.log("Pre order after rebalancing:");
  tree.preOrder(console.log);
  console.log("Post order after rebalancing:");
  tree.postOrder(console.log);
  console.log("In order after rebalancing:");
  tree.inOrder(console.log);
  