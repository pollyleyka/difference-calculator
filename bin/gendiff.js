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
    });

program.parse();


