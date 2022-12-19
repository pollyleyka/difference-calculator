import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import gendiff from '../src/index.js';
import stylish from '../__fixtures__/expectedStylish.js';
import plain from '../__fixtures__/expectedPlain.js';
import json from '../__fixtures__/expectedJson.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

describe('gendiff.test', () => {
  const filepath1 = getFixturePath('file1.json');
  const filepath2 = getFixturePath('file2.json');
  const filepath3 = getFixturePath('file1.yml');
  const filepath4 = getFixturePath('file2.yml');
  const filepath5 = getFixturePath('file1.yaml');
  const filepath6 = getFixturePath('file2.yaml');
  test.each([
    {
      a: filepath1,
      b: filepath2,
      expected: stylish,
    },
    {
      a: filepath1,
      b: filepath2,
      format: 'plain',
      expected: plain,
    },
    {
      a: filepath1,
      b: filepath2,
      format: 'json',
      expected: json,
    },
  ])('should be work with json %#', ({
    a, b, format, expected,
  }) => {
    expect(gendiff(a, b, format)).toEqual(expected);
  });
  test.each([
    {
      a: filepath3,
      b: filepath4,
      expected: stylish,
    },
    {
      a: filepath3,
      b: filepath4,
      format: 'plain',
      expected: plain,
    },
    {
      a: filepath3,
      b: filepath4,
      format: 'json',
      expected: json,
    },
    {
      a: filepath5,
      b: filepath6,
      expected: stylish,
    },
    {
      a: filepath5,
      b: filepath6,
      format: 'plain',
      expected: plain,
    },
    {
      a: filepath5,
      b: filepath6,
      format: 'json',
      expected: json,
    },
  ])('should be work with yaml %#', ({
    a, b, format, expected,
  }) => {
    expect(gendiff(a, b, format)).toEqual(expected);
  });
});
