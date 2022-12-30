import formatToStylish from './formatToStylish.js';
import formatToPlain from './formatToPlain.js';

const format = (tree, formatName) => {
  switch (formatName) {
    case 'plain':
      return formatToPlain(tree);
    case 'stylish':
      return formatToStylish(tree);
    case 'json':
      return JSON.stringify(tree);
    default:
      throw new Error(`Format name ${formatName} is not defined`);
  }
};
export default format;
