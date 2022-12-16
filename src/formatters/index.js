import stylish from './stylish.js';
import plain from './plain.js';

const getOutput = (tree, formatName) => {
  switch (formatName) {
    case 'plain':
      return plain(tree);
    case 'stylish':
      return stylish(tree);
    default:
      throw new Error(`Format name ${formatName} is not defined`);
  }
};
export default getOutput;
