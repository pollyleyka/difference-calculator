import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

const getExtention = (filePath) => path.extname(path.basename((filePath)));
const parseJson = (filePath) => JSON.parse(fs.readFileSync(path.resolve(filePath), 'utf-8'));
const parseYml = (filePath) => yaml.load(fs.readFileSync(path.resolve(filePath), 'utf-8'));

const parseFile = (filePath) => {
  const extention = getExtention(filePath);
  switch (extention) {
    case '.json':
      return parseJson(filePath);
    case ('.yml'):
      return parseYml(filePath);
    case ('.yaml'):
      return parseYml(filePath);
    default:
      throw new Error(`Unknown operator: '${extention}'!`);
  }
};

export default parseFile;
