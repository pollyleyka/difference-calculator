import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import gendiff from '../src/index.js';
import expectedStylish from '../__fixtures__/expectedStylish.js';
import expectedPlain from '../__fixtures__/expectedPlain.js';
import expectedJson from '../__fixtures__/expectedJson.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test('gendiffStylish', () => {
  expect(gendiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'stylish')).toEqual(expectedStylish);
  expect(gendiff(getFixturePath('file1.yml'), getFixturePath('file2.yml'))).toEqual(expectedStylish);
  expect(gendiff(getFixturePath('file1.yaml'), getFixturePath('file2.yaml'))).toEqual(expectedStylish);
  expect(gendiff(getFixturePath('file1.yaml'), getFixturePath('file2.json'))).toEqual(expectedStylish);
});
test('gendiffPlain', () => {
  expect(gendiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'plain')).toEqual(expectedPlain);
  expect(gendiff(getFixturePath('file1.yml'), getFixturePath('file2.yaml'), 'plain')).toEqual(expectedPlain);
});
test('gendiffJsont', () => {
  expect(gendiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'json')).toEqual(expectedJson);
  expect(gendiff(getFixturePath('file1.yml'), getFixturePath('file2.yaml'), 'json')).toEqual(expectedJson);
});
