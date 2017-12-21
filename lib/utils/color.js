function rgb2hex(rgb){
  rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
  return (rgb && rgb.length === 4) ? '#' +
    ('0' + parseInt(rgb[1],10).toString(16)).slice(-2) +
    ('0' + parseInt(rgb[2],10).toString(16)).slice(-2) +
    ('0' + parseInt(rgb[3],10).toString(16)).slice(-2) : '';
}

function ensureProperColor(color) {
  if (/rgba?/.test(color)) return rgb2hex(color);
  return color;
}

module.exports = {
  rgb2hex: rgb2hex,
  ensureProperColor: ensureProperColor,
}