import fs from 'fs';
import path from 'path';
import _ from 'lodash';

export default (filePath1, filePath2) => {
  const files = [filePath1, filePath2];
  const [fileData1, fileData2] = files.map((filePath) => {
    const data = fs.readFileSync(path.resolve(filePath), 'utf-8');
    return filePath.endsWith('json') ? JSON.parse(data) : data;
  });
  const compare = (data1, data2) => {
    const keys1 = Object.keys(data1);
    const keys2 = Object.keys(data2);
    const keys = _.sortBy(_.union(keys1, keys2));
    const result = [];
    for (const key of keys) {
      if (!Object.hasOwn(data1, key)) {
        result.push(`+ ${key}: ${data2[key]}`);
      } else if (!Object.hasOwn(data2, key)) {
        result.push(`- ${key}: ${data1[key]}`);
      } else if (data1[key] !== data2[key]) {
        result.push(`- ${key}: ${data1[key]}\n+ ${key}: ${data2[key]}`);
      }
      result.push(`  ${key}: ${data2[key]}`);
    }
    return `{\n${result.join('\n')}\n}`;
  };
  const gendiffResult = compare(fileData1, fileData2);
  console.log(gendiffResult);
};
