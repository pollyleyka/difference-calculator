import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

const formatter = (tree, format) => {
  switch (format) {
    case 'plain':
      return plain(tree);
    case 'stylish':
      return stylish(tree);
    case 'json':
      return json(tree);
    default:
      throw new Error(`Format name ${format} is not defined`);
  }
};
export default formatter;
