function TAG(name, children = [], style = {}, props = {}) {
  if (typeof children === 'string') {
    children = [TEX(children)];
  }
  if (!Array.isArray(children)) {
    children = [children];
  }

  const ele = {
    tagName: name.toUpperCase(),
    nodeType: 1,
    style: style,
    childNodes: children,
  };
  return Object.assign(ele, props);
}

TAG.IMG = src => TAG('IMG', [], {}, { src: src });

function TEX(content) {
  return {
    nodeType: 3,
    textContent: content,
    childNodes: [],
  }
}

module.exports = {
  TAG: TAG,
  TEX: TEX,
}