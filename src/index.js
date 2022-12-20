import getTreeOfDifferance from './compare.js';
import getOutput from './formatters/index.js';
import getObject from './parsers.js';

const gendiff = (pathToFile1, pathToFile2, format = 'stylish') => {
  const [data1, data2] = [pathToFile1, pathToFile2].map(getObject);
  const differanceTree = getTreeOfDifferance(data1, data2);
  return getOutput(differanceTree, format);
};
export default gendiff;
