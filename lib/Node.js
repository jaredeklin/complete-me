export default class Node {
  constructor (data) {
    this.data = data;
    this.completeWord = false;
    this.children = {};
    this.priority = 0;
  }
}
