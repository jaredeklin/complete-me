class Node {
  constructor (data) {
    this.data = data;
    this.completeWord = false;
    this.children = {};
    this.priority = 0;
  }
}

module.exports = Node;
