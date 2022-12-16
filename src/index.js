import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import parser from './parsers.js';
import getOutput from './formatters/index.js';

const getAbsPath = (filePath) => path.resolve(process.cwd(), filePath);
const getExtension = (filePath) => path.parse(filePath).ext.slice(1);
const readFile = (filePath) => fs.readFileSync(filePath, 'utf8');

const gendiff = (filePath1, filePath2, format = 'stylish') => {
  const path1 = getAbsPath(filePath1);
  const path2 = getAbsPath(filePath2);

  const ext1 = getExtension(filePath1);
  const ext2 = getExtension(filePath2);

  const data1 = readFile(path1);
  const data2 = readFile(path2);

  const tree1 = parser(ext1, data1);
  const tree2 = parser(ext2, data2);

  const getTreeOfDifferance = (obj1, obj2) => {
    const keys2 = Object.keys(obj1);
    const keys1 = Object.keys(obj2);
    const sortedUniqKeys = _.sortBy(_.union(keys1, keys2));
    const treeOfDifferance = sortedUniqKeys.map((key) => {
      if (_.isObject(obj1[key]) && _.isObject(obj2[key])) {
        return {
          name: key,
          type: 'withNested',
          children: getTreeOfDifferance(obj1[key], obj2[key]),
        };
      }

      if (!Object.hasOwn(obj2, key)) {
        return {
          name: key,
          type: 'deleted',
          value: obj1[key],
        };
      }

      if (!Object.hasOwn(obj1, key)) {
        return {
          name: key,
          type: 'added',
          value: obj2[key],
        };
      }

      if (obj1[key] === obj2[key]) {
        return {
          name: key,
          type: 'unchanged',
          value: obj1[key],
        };
      }
      return {
        name: key,
        type: 'changed',
        changedFrom: obj1[key],
        changedTo: obj2[key],
      };
    });
    return treeOfDifferance;
  };
  const differanceTree = getTreeOfDifferance(tree1, tree2);
  const output = getOutput(differanceTree, format);
  return output;
};
export default gendiff;
