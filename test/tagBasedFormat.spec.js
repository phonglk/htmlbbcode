// B U I
const assert = require('assert');
const { TAG, TEX } = require('./util/dom');
const parse = require('../lib/parseNodeToBBCode');
describe('Tag based formatting', () => {
  describe('Basic', () => {
    it('only B tag', () => {
      assert.equal(parse(
        TAG('B', 'this is text')
      ), '[B]this is text[/B]');
    })
    it('only I tag', () => {
      assert.equal(parse(
        TAG('I', 'this is text')
      ), '[I]this is text[/I]');
    })
    it('only U tag', () => {
      assert.equal(parse(
        TAG('U', 'this is text')
      ), '[U]this is text[/U]');
    })
    it('only STRIKE tag', () => {
      assert.equal(parse(
        TAG('STRIKE', 'this is text')
      ), '[STRIKE]this is text[/STRIKE]');
    })
    it('combine U, I, B tags', () => {
      assert.equal(parse(
          TAG('B', [
            TEX('this '),
            TAG('I', [
              TEX('is '),
              TAG('U', 'text')
            ])
          ])
        ),
        '[B]this [I]is [U]text[/U][/I][/B]'
      )
    })
  })
  describe('LIST', () => {
    it('UL', () => {
      assert.equal(parse(
        TAG('UL', [
          TAG('LI', 'item 1'),
          TAG('LI', 'item 2'),
          TAG('LI', 'item 3'),
        ])
      ), '[LIST][*]item 1[*]item 2[*]item 3[/LIST]')
    })
    it('OL', () => {
      assert.equal(parse(
        TAG('OL', [
          TAG('LI', 'item 1'),
          TAG('LI', 'item 2'),
          TAG('LI', 'item 3'),
        ])
      ), '[LIST=1][*]item 1[*]item 2[*]item 3[/LIST]')
    })
  })

  describe('Paragraph formating', () => {
    it('DIV', () => {
      assert.equal(parse(
        TAG('DIV')
      ), '\n');
    });

    it('P', () => {
      assert.equal(parse(
        TAG('P')
      ), '\n\n');
    })

    it('BR', () => {
      assert.equal(parse(
        TAG('BR')
      ), '\n');
    })

    it('BLOCKQUOTE', () => {
      assert.equal(parse(
        TAG('BLOCKQUOTE', 'text inside')
      ), '[INDENT]text inside[/INDENT]');
    })

    it('Combine Blockquote and B and BR', () => {
      assert.equal(parse(
        TAG('BLOCKQUOTE', [
          TAG('B', 'Test Bold'),
          TAG('BR'),
          TAG('I', 'Test Italic')
        ])
      ), '[INDENT][B]Test Bold[/B]\n[I]Test Italic[/I][/INDENT]');
    })

  })

  describe('Header', () => {
    it('H1', () => {
      assert.equal(parse(
        TAG('H1', 'Header Text')
      ), '[B][SIZE="7"]Header Text[/SIZE][/B]\n');
    })

    it('H2', () => {
      assert.equal(parse(
        TAG('H2', 'Header Text')
      ), '[B][SIZE="6"]Header Text[/SIZE][/B]\n');
    })

    it('H3', () => {
      assert.equal(parse(
        TAG('H3', 'Header Text')
      ), '[B][SIZE="5"]Header Text[/SIZE][/B]\n');
    })

    it('H4', () => {
      assert.equal(parse(
        TAG('H4', 'Header Text')
      ), '[B][SIZE="4"]Header Text[/SIZE][/B]\n');
    })

  })

  describe('Table', () => {
    it('table and tr', () => {
      assert.equal(parse(
        TAG('TABLE', [
          TAG('THEAD', [
            TAG('TR', [
              TAG('TH', 'Column 1'),
              TAG('TH', 'Column 2'),
              TAG('TH', 'Column 3'),
            ])
          ]),
          TAG('TBODY', [
            TAG('TR', [
              TAG('TD', 'Cell 1.1'),
              TAG('TD', 'Cell 1.2'),
              TAG('TD', 'Cell 1.3'),
            ]),
            TAG('TR', [
              TAG('TD', 'Cell 2.1'),
              TAG('TD', 'Cell 2.2'),
              TAG('TD', 'Cell 2.3'),
            ])
          ])
        ])
      ), '| Column 1 || Column 2 || Column 3 |\n| Cell 1.1 || Cell 1.2 || Cell 1.3 |\n| Cell 2.1 || Cell 2.2 || Cell 2.3 |\n\n');
    })

  });

  describe('FONT', () => {
    it('color vars', () => {
      assert.equal(parse(
        TAG('FONT', 'text', {}, { color: 'red'}))
        , '[COLOR="red"]text[/COLOR]'
      )
    })

    it('color rgb', () => {
      assert.equal(parse(
        TAG('FONT', 'text', {}, { color: 'rgb(255,0,0)'}))
        , '[COLOR="#ff0000"]text[/COLOR]'
      )
    })

    it('color hex', () => {
      assert.equal(parse(
        TAG('FONT', 'text', {}, { color: '#999'}))
        , '[COLOR="#999"]text[/COLOR]'
      )
    })

  })

  describe('Hyperlink - A', () => {
    it('Only A', () => {
      assert.equal(parse(
        TAG('A', 'this is a link', {}, { href: 'http://test'}))
        , '[URL=http://test]this is a link[/URL]'
      )
    })


    it('A with children ', () => {
      assert.equal(parse(
        TAG('A', TAG('B', 'this is a link'), {}, { href: 'http://test'}))
        , '[URL=http://test][B]this is a link[/B][/URL]'
      )
    })
  })

  it('Ignore Comment', () => {
    assert.equal(parse({
      nodeType: 8
    }), null)
  })

  it('IMG Tag', () => {
    assert.equal(parse(TAG.IMG('image://image')), '[IMG]image://image[/IMG]')
  })

  it('IFRAME Tag - Video', () => {
    assert.equal(parse(TAG('IFRAME', [], {}, { src: 'http://video:iframe' })), '\nhttp://video:iframe\n')
  })

  it('IFRAME Tag - Non-Video', () => {
    assert.equal(parse(TAG('IFRAME', [], {}, { src: 'http://iframe' })), '')
  })

  it('Unrecognized Tag', () => {
    assert.equal(parse(TAG('BOGUS', 'this is not a supported tag')), 'this is not a supported tag')
  })

  it('Unrecognized NodeType', () => {
    assert.equal(parse({ nodeType: 4 }), null)
  })
})