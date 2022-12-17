import getTreeOfDifferance from './compare.js';
import getOutput from './formatters/index.js';
import getObject from './parsers.js';

const gendiff = (filePath1, filePath2, format = 'stylish') => {
  const [tree1, tree2] = [filePath1, filePath2].map(getObject);
  const differanceTree = getTreeOfDifferance(tree1, tree2);
  const result = getOutput(differanceTree, format);
  console.log(result);
  return result;
};
export default gendiff;
