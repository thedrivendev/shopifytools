module.exports = string => {
  return [...string.replace(/\ /g, '')]
    .map((char, index) => (index === 0 ? char.toLowerCase() : char))
    .join('');
};
