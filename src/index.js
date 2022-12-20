import fs from 'fs';
import path from 'path';
import parse from './parser.js';
import getTreeOfDifferance from './compare.js';
import formatter from './formatters/index.js';

const readFile = (pathToFile) => {
  const fullPath = path.resolve(process.cwd(), pathToFile);
  const format = path.parse(pathToFile).ext.slice(1);
  const data = fs.readFileSync(fullPath).toString();
  const parsedData = parse(data, format);
  return parsedData;
};

const gendiff = (pathToFile1, pathToFile2, format = 'stylish') => {
  const data1 = readFile(pathToFile1);
  const data2 = readFile(pathToFile2);
  const differanceTree = getTreeOfDifferance(data1, data2);
  return formatter(differanceTree, format);
};
export default gendiff;
