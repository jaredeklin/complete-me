import Node from './Node';
import fs from 'fs';

const text = "/usr/share/dict/words"
const dictionary = fs.readFileSync(text).toString().trim().split('\n')


export default class Trie {
  constructor() {
    
    this.children = {};
    this.count = 0;
  }

  count() {
    return this.count;
  }

  insert(word) {
   
    //recursive version
    const addWord = (node, word) => {
      const firstLetter = word[0];
      if (!node.children[firstLetter]) {
        node.children[firstLetter] = new Node(firstLetter);
      }
      if (word.length === 1) {
        this.count++;
        node.children[firstLetter].completeWord = true;
      }
      if (word.length > 1) {
        addWord(node.children[firstLetter], word.slice(1));
      }
    }

    addWord(this, word);
  

    //loop version

    // this.count++;
    // let letters = [...word]
    // let currentNode = this.children;
    // console.log(currentNode)

    // while (letters.length) {
    //   let firstLetter = letters.shift();

    //   if(!currentNode[firstLetter]) {
    //     currentNode[firstLetter] = new Node();
    //   }

    //   if(!letters.length) {
    //     currentNode[firstLetter].completeWord = true; 
    //   }

    //   currentNode = currentNode[firstLetter].children
    // }
  }

  suggest(prefix) {
    let suggestions = [];
    // let letters = [...prefix];
    let currentNode = this;
    let count = 0;
    // console.log('letters', letters)

    while(count < prefix.length) {
      if(currentNode.children[prefix[count]]) {
        // console.log('currentNode children', currentNode.children)
        currentNode = currentNode.children[prefix[count]];
        // console.log('prefix[count]', prefix[count])
      }
      count++
      // console.log(count)
    }

    const addSuggestion = (node, prefix) => {
      // console.log(node.completeWord)
      if (node.completeWord) {
        suggestions.push(prefix);
      }

      const childNodes = Object.keys(node.children);

      childNodes.forEach((child) => {
        const newString = prefix + child;

        addSuggestion(node.children[child], newString);
      });
    }
    
    addSuggestion(currentNode, prefix);
    console.log('suggestions', suggestions);
    return suggestions
  }


  populate(array) {
    array.forEach(word => {
      this.insert(word)
    })
  }


  select(word) {
    let letters = [...word];
    let currentNode = this.children;

    while (letters.length > 1) {
      let currentLetter = letters.shift();
      let letterKey = Object.keys(currentNode);

      if(letterKey.find(letter => letter === currentLetter)) {
        console.log(currentNode[letters].children);
        currentNode = currentNode[letters].children;
      }

      currentNode[letters[letters.length - 1]].popularity++;
    }


  }
}







