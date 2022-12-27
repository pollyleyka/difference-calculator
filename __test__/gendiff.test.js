import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import genDiff from '../src/index.js';
import stylishResult from '../__fixtures__/expectedStylish.js';
import plainResult from '../__fixtures__/expectedPlain.js';
import jsonResult from '../__fixtures__/expectedJson.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filepath) => path.join(__dirname, '..', '__fixtures__', filepath);
const testList = ['json', 'yml', 'yaml'];

test.each(testList)('gendiff %s', (format) => {
  const filepath1 = getFixturePath(`file1.${format}`);
  const filepath2 = getFixturePath(`file2.${format}`);

  expect(genDiff(filepath1, filepath2)).toEqual(stylishResult);
  expect(genDiff(filepath1, filepath2, 'stylish')).toEqual(stylishResult);
  expect(genDiff(filepath1, filepath2, 'plain')).toEqual(plainResult);
  expect(genDiff(filepath1, filepath2, 'json')).toEqual(jsonResult);
});
