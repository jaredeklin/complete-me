import Node from './Node';

export default class Trie {
  constructor() {
    this.children = {};
    this.count = 0;
  }

  count() {
    return this.count;
  }

  insert(word) {
    let currentNode = this.children;
    let letters = [...word];

    while( letters.length) {

      let firstLetter = letters.shift();

      if(!currentNode[firstLetter]) {
        currentNode[firstLetter] = new Node();
      }

      if(!letters.length && !currentNode[firstLetter].completeWord) {
          currentNode[firstLetter].completeWord = true;
          this.count++;
      }

      currentNode = currentNode[firstLetter].children;
    }
  }

  traverse(prefix) {

    let currentNode = this;
    let count = 0;

    while (count < prefix.length) {
      if (currentNode.children[prefix[count]]) {
        currentNode = currentNode.children[prefix[count]];     
      }
      count++;  
    }
    return currentNode;
  }

  suggest(prefix) {
    let suggestions = [];
    let currentNode = this.traverse(prefix);

    const addSuggestion = (node, prefix) => {
     
      if (node.completeWord) {
        if (node.priority === 0) {
          suggestions.push(prefix);
        } else {
          suggestions.unshift(prefix);
        }
      }

      const childNodes = Object.keys(node.children);

      childNodes.forEach( child => {
        const newPrefix = prefix + child;

        addSuggestion(node.children[child], newPrefix);
      });
    };
    
    addSuggestion(currentNode, prefix);
    return suggestions;
  }


  populate(array) {
    array.forEach(word => {
      this.insert(word);
    });
  }


  select(word) {
    let currentNode = this.traverse(word);

    currentNode.priority++;
  }

  delete(word) {
    let currentNode = this.traverse(word);
    
    currentNode.completeWord = false;
  }
}







