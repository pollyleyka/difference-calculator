import yaml from 'js-yaml';
import fs from 'fs';
import path from 'path';

const getFullPath = (pathToFile) => path.resolve(process.cwd(), pathToFile);
const getExtension = (filePath) => path.parse(filePath).ext.slice(1);
const readFile = (filePath) => fs.readFileSync(filePath, 'utf8');
const parser = (extension, data) => {
  switch (extension) {
    case 'json':
      return JSON.parse(data);
    case 'yml':
      return yaml.load(data);
    case 'yaml':
      return yaml.load(data);
    default:
      throw Error('This extension is not used');
  }
};

const getObject = (filePath) => parser(getExtension(filePath), readFile(getFullPath(filePath)));
export default getObject;
