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

  describe('Insert', () => {

    it('should be able to increment the count', () => {
      expect(trie.count).to.equal(0);
      expect(trie.insert('pizza'));
      expect(trie.count).to.equal(1);
    })

    it('should add the word', () => {
      trie.insert('cat')
      expect(trie.children['c']).to.exist
      expect(trie.children['c'].children['a']).to.exist
      expect(trie.children['c'].children['a'].children['t']).to.exist
      expect(trie.children['c'].children['a'].children['t'].completeWord).to.be.true
    })

    it('should not increment the word count if the word already exists', () => {
      trie.insert('cat');
      expect(trie.count).to.equal(1);
      trie.insert('cat');
      expect(trie.count).to.equal(1);
    })
  })

  describe('Suggest', () => {

    it('should return an array of suggested words', () => {
      trie.populate(dictionary)
      let results = trie.suggest('piz')
      expect(results).to.eql(["pize", "pizza", "pizzeria", "pizzicato", "pizzle"])
    })

    it('should prioritize previously selected words on suggestion', () => {
      trie.populate(dictionary)
      trie.suggest('piz')
      expect(trie.suggest('piz')).to.eql(["pize", "pizza", "pizzeria", "pizzicato", "pizzle"])
      trie.select('pizzeria')
      trie.suggest('piz')
      expect(trie.suggest('piz')).to.eql(["pizzeria", "pize", "pizza", "pizzicato", "pizzle"])
    })

    it('should only return array of valid suggestions', () => {

      trie.insert('piano')
      trie.insert('pizza')
      trie.insert('pizzas')
      trie.insert('dog')
      trie.insert('pizzicato')

      let results = trie.suggest('piz')

      let check1 = results.some(result => result === 'pizza')
      let check2 = results.some(result => result === 'pizzas')
      let check3 = results.some(result => result === 'piano')
      let check4 = results.some(result => result === 'dog')
      let check5 = results.some(result => result === 'pizzicato')

      expect(check1).to.be.true
      expect(check2).to.be.true
      expect(check3).to.be.false
      expect(check4).to.be.false
      expect(check5).to.be.true
    })
  })

  describe('populate', () => {

    it('should populate the trie with a word' , () => {
      trie.insert('dogg')
      expect(trie.count).to.equal(1)
    })

    it('should populate the trie with so many word' , () => {
      trie.populate(dictionary)
      expect(trie.count).to.equal(235886)
    })
  })


  describe('select', () => {

    beforeEach( () => {
      trie.populate(dictionary)
    })

    it('should increment the priority when selected', () => {
      expect(trie.children['d'].children['o'].children['g'].priority).to.equal(0);
      trie.select('dog')
      expect(trie.children['d'].children['o'].children['g'].priority).to.equal(1);
    })
  })


  describe('Delete', () => {
    beforeEach( () => {
      trie.populate(dictionary)
      trie.suggest('piz') 
    })

    it('should delete a word from suggestions', () => {
      trie.delete("pize");
      trie.suggest('piz');
      expect(trie.suggest('piz')).to.eql(["pizza", "pizzeria", "pizzicato", "pizzle"])
    })   
  })
})