import { expect } from 'chai';
import Node from '../lib/Node';

describe('NODE', () => {
  let node;

  beforeEach(() => {
    node = new Node('pizza')
  })

  it('should exist', () => {
    expect(node).to.exist
  })

  it('should default completeWord to false', () => {
    expect(node.completeWord).to.equal(false);
  })

  it('should take data and assign it to data prop', () => {
    expect(node.data).to.equal('pizza')
  })

  it('should default priority to 0', () => {
    expect(node.priority).to.equal(0);
  })

  it('should default children object to empty', () => {
    expect(node.children).to.eql({});
  })

})