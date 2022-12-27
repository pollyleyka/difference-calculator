import fs from 'fs';
import path from 'path';
import parse from './parser.js';
import buildTree from './buildTree.js';
import format from './formatters/index.js';

const extractFormat = (pathToFile) => path.extname(pathToFile).toLowerCase().slice(1);

const readFile = (filepath) => {
  const fullPath = path.resolve(process.cwd(), filepath);
  const parsedData = parse(fs.readFileSync(fullPath).toString(), extractFormat(fullPath));
  return parsedData;
};

const gendiff = (filepath1, filepath2, formatName = 'stylish') => {
  const data1 = readFile(filepath1);
  const data2 = readFile(filepath2);
  const differanceTree = buildTree(data1, data2);
  return format(differanceTree, formatName);
};
export default gendiff;
