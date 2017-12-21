const { ensureProperColor } = require('./utils/color');

function wrappingArround({ pre, post, tracker } ,pr, po) {
  const isPre = typeof pre !== 'undefined' && pre !== null;
  const isPost = typeof post !== 'undefined' && post !== null;
  if (isPre) {
    pre.unshift(pr);
  }
  if (isPost) {
    post.push(po);
  }
  if (isPre || isPost) {
    tracker.count++;
  }
}

function parseToBB(node) {
  const bbcodes = [];
  const pre = [];
  const post = [];
  const tracker = {
    count: 0,
  };
  const pp = wrappingArround.bind(null, { pre, post, tracker });
  let processBasedOnStyle = true;
  switch (node.nodeType) {
    case 1: { // tag
      switch (node.tagName.toUpperCase()) {
        case 'UL': { pp('[LIST]', '[/LIST]'); processBasedOnStyle = true; break; }
        case 'OL': { pp('[LIST=1]', '[/LIST]'); break; }
        case 'LI': { pp('[*]'); break; }
        case 'B': { pp('[B]', '[/B]'); break; }
        case 'U': { pp('[U]', '[/U]'); break; }
        case 'I': { pp('[I]', '[/I]'); break; }
        case 'STRIKE': { pp('[STRIKE]', '[/STRIKE]'); break; }
        case 'DIV': { pp(null, '\n'); break; }
        case 'P': { pp('\n', '\n'); break; }
        case 'BR': { pp('\n'); break; }
        case 'BLOCKQUOTE': { pp('[INDENT]', '[/INDENT]'); break; }
        case 'IMG': {
          const { src } = node;
          return `[IMG]${src}[/IMG]`;
        }
        case 'FONT': {
          const { color } = node;
          if (color) {
            pp(`[COLOR="${ensureProperColor(color)}"]`, '[/COLOR]');
          }
          break;
        }
        case 'A': {
          const { href } = node;
          if (href && href.length > 0) {
            pp(`[URL=${href}]`, '[/URL]');
          }
          break;
        }

        case 'H1': { pp('[B][SIZE="7"]', '[/SIZE][/B]\n'); break; }
        case 'H2': { pp('[B][SIZE="6"]', '[/SIZE][/B]\n'); break; }
        case 'H3': { pp('[B][SIZE="5"]', '[/SIZE][/B]\n'); break; }
        case 'H4': { pp('[B][SIZE="4"]', '[/SIZE][/B]\n'); break; }
        case 'TABLE':
        case 'TR': {
          pp(null, '\n');
          break;
        }
        case 'TH':
        case 'TD': {
          pp('| ', ' |'); break;
        }
        case 'IFRAME': {
          const { src } = node;
          if (/video/.test(src)) return `\n${src}\n`;
          return '';
        }
      }
      if (processBasedOnStyle === true) {
        const { textAlign, fontWeight, fontStyle, textDecoration, color } = node.style;
        if (textAlign) {
          switch (textAlign.toUpperCase()) {
            case 'LEFT': { pp('[LEFT]', '[/LEFT]'); break; }
            case 'RIGHT': { pp('[RIGHT]', '[/RIGHT]'); break; }
            case 'CENTER': { pp('[CENTER]', '[/CENTER]'); break; }
          }
        }
        if (fontWeight === 'bold' || ~~fontWeight >= 600) {
          pp('[B]', '[/B]');
        }
        if (fontStyle === 'italic') pp('[I]', '[/I]');
        if (textDecoration === 'underline') pp('[U]', '[/U]');
        if (color && color.trim() !== '') pp(`[COLOR="${ensureProperColor(color)}"]`, '[/COLOR]');
      }
      break;
    }
    case 3: {
      return node.textContent;
    } // textNode
    case 8: return null; // comment
    default: return null;
  }
  node.childNodes.forEach((cnode, i) => {
    const out = parseToBB(cnode);
    if (out !== null) {
      bbcodes.push(out);
    }
  });
  return pre.concat(bbcodes).concat(post).join('');
}

module.exports = parseToBB;