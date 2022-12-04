import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import gendiff from '../src/index.js';
import expected from '../__fixtures__/expected.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
test('gendiff', () => {
  expect(gendiff(getFixturePath('file1.json'), getFixturePath('file2.json'))).toEqual(expected);
});
