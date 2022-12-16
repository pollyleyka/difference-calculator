#!/usr/bin/env node
import { Command } from 'commander';
import gendiff from '../src/index.js';

const program = new Command();
program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('0.4.0')
  .arguments('<filePath1> <filePath2>')
  .helpOption(true, 'output usage information')
  .option('-f, --format [ type ]', 'output format', 'stylish')
  .action((filePath1, filePath2) => {
    console.log(gendiff(filePath1, filePath2, program.opts().format));
  });

program.parse();
