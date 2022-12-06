import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import gendiff from '../src/index.js';
import expected from '../__fixtures__/expected.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
test('gendiffJSON', () => {
  expect(gendiff(getFixturePath('file1.json'), getFixturePath('file2.json'))).toEqual(expected);
});
test('gendiffYML', () => {
  expect(gendiff(getFixturePath('file1.yml'), getFixturePath('file2.yml'))).toEqual(expected);
});
test('gendiffDif', () => {
  expect(gendiff(getFixturePath('file1.yml'), getFixturePath('file2.json'))).toEqual(expected);
});
test('gendiffYAML', () => {
  expect(gendiff(getFixturePath('file1.yaml'), getFixturePath('file2.yaml'))).toEqual(expected);
});
// test('gendiffEror', () => {
//   expect(gendiff(getFixturePath('file1.js'), getFixturePath('file2.json'))).toEqual(Error);
// });
