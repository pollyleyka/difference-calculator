import fs from 'fs';
import path from 'path';
//import cwd from 'cwd';
import _ from 'lodash';

export default (filePath1, filePath2) => {
    const files = [filePath1, filePath2];
    const [fileData1, fileData2] = files.map((filePath) => {
         const data = fs.readFileSync(path.resolve(filePath));
         return filePath.endsWith('json') ? JSON.parse(data) : data;
    })
     const compare = (data1, data2) => {
         const keys1 = Object.keys(data1);
         const keys2 = Object.keys(data2);
        const keys = _.sortBy(_.union(keys1, keys2));
        let result = [];
        for (const key of keys) {
            if (!Object.hasOwn(data1, key)) {
                let added = `+ ${key}: ${data2[key]}`;
                result.push(added);
            } else if (!Object.hasOwn(data2, key)) {
                let deleted = `- ${key}: ${data1[key]}`;
                result.push(deleted);
            } else if (data1[key] !== data2[key]) {
                let changed = `- ${key}: ${data1[key]}\n+ ${key}: ${data2[key]}`;
                result.push(changed);
            } else {
                let unchanged = `  ${key}: ${data2[key]}`
                result.push(unchanged);
            }
        }
        return `{\n${result.join('\n')}\n}`;
    };
    const result = compare(fileData1, fileData2);
    console.log(result);
};
