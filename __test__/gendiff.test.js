import gendiff from '../src/index.js';
import expected from '../__fixtures__/expected.js'

test('gendiff', () => {
  expect(gendiff('__fixtures__/file1.json', '__fixtures__/file2.json')).toEqual(expected);
});