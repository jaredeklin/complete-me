import { expect } from 'chai';
import Trie from '../lib/Trie';
import Node from '../lib/Node';
import fs from 'fs';

const text = "/usr/share/dict/words"
const dictionary = fs.readFileSync(text).toString().trim().split('\n')

describe('Trie', () => {
  let trie;

  beforeEach( () => {
    trie = new Trie;
  });

  it('should instantiate our friend trie', () => {
    expect(trie).to.exist;
  })

  it('should count the number of words', () => {
    expect(trie.count).to.equal(0);
  })

  it('should store nodes', () => {
    expect(trie.children).to.deep.equal({});
  })

  describe.skip('Insert', () => {

    it('should be able to increment the count', () => {
      expect(trie.count).to.equal(0);
      expect(trie.insert('pizza'));
      expect(trie.count).to.equal(1);
    })

    it('should add the word', () => {
    trie.insert('tacocat')
    trie.insert('pizza')
    trie.insert('cat')
    expect(trie.children['c']).to.exist
    expect(trie.children['c'].children['a']).to.exist
    expect(trie.children['c'].children['a'].children['t']).to.exist
    expect(trie.children['c'].children['a'].children['t'].completeWord).to.be.true
    // console.log(JSON.stringify(trie, null, 4))
    })
  })

  describe.skip('Suggest', () => {

    beforeEach( () => {
      // trie.insert('piano')
      // trie.insert('pizza')
      // trie.insert('pizzas')
      // trie.insert('dog')
      trie.populate(dictionary)
    })
    it('should return an array of suggested words', () => {
      let results = trie.suggest('piz')
      expect(results).to.eql(["pize", "pizza", "pizzeria", "pizzicato", "pizzle"])
      // expect(results).to.eql(['pizza','pizzas'])
      // let check1 = results.some(result => result === 'pizza')
      // let check2 = results.some(result => result === 'pizzas')
      // let check3 = results.some(result => result === 'piano')
      // let check4 = results.some(result => result === 'dog')

      // expect(check1).to.be.true
      // expect(check2).to.be.true
      // expect(check3).to.be.true
      // expect(check4).to.be.false
    })
  })

  describe.skip('populate', () => {
    beforeEach( () => {
      trie.populate(dictionary)
    })
    it('should populate the trie with so many word' , () => {
      expect(trie.count).to.equal(235886)
    })
  })


  describe.only('select', () => {

    beforeEach( () => {
        trie.populate(dictionary)
        trie.suggest('piz')
    })

    it('should select a word', () => {
      // let results = trie.suggest('piz')
      expect(trie.suggest('piz')).to.eql(["pize", "pizza", "pizzeria", "pizzicato", "pizzle"])
      trie.select('pizzeria')
      trie.suggest('piz')
      expect(trie.suggest('piz')).to.eql(["pizzeria", "pize", "pizza", "pizzicato", "pizzle"])
    })
  })
})