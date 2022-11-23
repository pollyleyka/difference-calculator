#!/usr/bin/env node
import { program } from 'commander';
import fs from 'fs';
import path from 'path';
//import cwd from 'cwd';
import _ from 'lodash';

program
    .name('gendiff')
    .description('Compares two configuration files and shows a difference.')
    .version('0.1.0')
    .argument('<filePath1>')
    .argument('<filePath1>')
    .helpOption(true, 'output usage information')
    .option('-f, --format < type >', 'output format', )
    .action((filePath1, filePath2) => {
        const getFullPath = (fileName) => path.resolve(fileName);
        const getDataFromJson = (filePath) => JSON.parse(fs.readFileSync(filePath));
             const fileData1 = getDataFromJson(getFullPath(filePath1));
             const fileData2 = getDataFromJson(getFullPath(filePath2));
        const compare = (data1, data2) => {
            const keys1 = Object.keys(data1);
            const keys2 = Object.keys(data2);
            const keys = _.union(keys1, keys2).sort();

            const result = {};
            for (const key of keys) {
                if (!Object.hasOwn(data1, key)) {
                    result[`+ ${key}`] = _.clone(data2[key]);
                } else if (!Object.hasOwn(data2, key)) {
                    result[`- ${key}`] = _.clone(data1[key]);
                } else if (data1[key] !== data2[key]) {
                    result[`- ${key}`] = _.clone(data1[key]);
                    result[`+ ${key}`] = _.clone(data2[key]);
                } else {
                    result[key] = _.clone(data1[key]);
                }
            }
            console.log(result);
            return result;
        };
        const result = JSON.stringify(compare(fileData1, fileData2));
        console.log(result);
        console.log(typeof(result));
    });

program.parse();


