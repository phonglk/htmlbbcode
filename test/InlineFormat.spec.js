// B U I
const assert = require('assert');
const { TAG, TEX } = require('./util/dom');
const parse = require('../lib/parseNodeToBBCode');
describe('Inline formatting', () => {
  describe('Text Formatting', () => {
    it('Bold', () => {
      assert.equal(parse(
        TAG('DIV', 'this is text', {
          fontWeight: 'bold',
        })
      ), '[B]this is text\n[/B]');
    })
    
    it('Bold -- num', () => {
      assert.equal(parse(
        TAG('DIV', 'this is text', {
          fontWeight: 900,
        })
      ), '[B]this is text\n[/B]');
    })
    
    it('Italic', () => {
      assert.equal(parse(
        TAG('DIV', 'this is text', {
          fontStyle: 'italic',
        })
      ), '[I]this is text\n[/I]');
    })
    
    it('Underline', () => {
      assert.equal(parse(
        TAG('DIV', 'this is text', {
          textDecoration: 'underline',
        })
      ), '[U]this is text\n[/U]');
    })
    
    it('Font color', () => {
      assert.equal(parse(
        TAG('DIV', 'this is text', {
          color: 'red',
        })
      ), '[COLOR="red"]this is text\n[/COLOR]');
    })
  })

  describe('Block Formatting', () => {
    it('Align Left', () => {
      assert.equal(parse(
        TAG('DIV', 'this is text', {
          textAlign: 'left',
        })
      ), '[LEFT]this is text\n[/LEFT]');
    })
    
    it('Align Center', () => {
      assert.equal(parse(
        TAG('DIV', 'this is text', {
          textAlign: 'center',
        })
      ), '[CENTER]this is text\n[/CENTER]');
    })
    
    it('Align Right', () => {
      assert.equal(parse(
        TAG('DIV', 'this is text', {
          textAlign: 'right',
        })
      ), '[RIGHT]this is text\n[/RIGHT]');
    })
    
  })
})