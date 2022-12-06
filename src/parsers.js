import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

const parseJson = (filePath) => JSON.parse(fs.readFileSync(path.resolve(filePath), 'utf-8'));
const parseYml = (filePath) => yaml.load(fs.readFileSync(path.resolve(filePath), 'utf-8'));
const parseFiles = (files) => files.map((file) => {
  if (file.endsWith('json')) {
    return parseJson(file);
  } return parseYml(file);
});

export {
  parseJson,
  parseYml,
  parseFiles,
};
