const assert = require('assert');
const { ensureProperColor, rgb2hex } = require('../lib/utils/color');
describe('Color functions', () => {
  it('Convert RGB to HEX', () => {
    assert.equal(rgb2hex('rgb(255,0,0)'), '#ff0000');
  })
  it('Wrong RGB Format', () => {
    assert.equal(rgb2hex('rgb___(255,0,0,0)'), '');
  })

  it('ensureProperColor - rgb', () => {
    assert.equal(ensureProperColor('rgb(255,0,0)'), '#ff0000');
  })

  it('ensureProperColor - color name', () => {
    assert.equal(ensureProperColor('red'), 'red');
  })
});