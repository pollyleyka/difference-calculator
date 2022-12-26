import fs from 'fs';
import path from 'path';
import parse from './parser.js';
import buildTree from './buildTree.js';
import format from './formatters/index.js';

const extractFormat = (pathToFile) => path.extname(pathToFile).toLowerCase().slice(1);

const readFile = (pathToFile) => {
  const fullPath = path.resolve(process.cwd(), pathToFile);
  const parsedData = parse(fs.readFileSync(fullPath).toString(), extractFormat(fullPath));
  return parsedData;
};

const gendiff = (pathToFile1, pathToFile2, formatName = 'stylish') => {
  const data1 = readFile(pathToFile1);
  const data2 = readFile(pathToFile2);
  const differanceTree = buildTree(data1, data2);
  return format(differanceTree, formatName);
};
export default gendiff;
