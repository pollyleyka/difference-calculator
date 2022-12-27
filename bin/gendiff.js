#!/usr/bin/env node
import { Command } from 'commander';
import gendiff from '../src/index.js';

const program = new Command();
program
  .name('gendiff')
  .version('0.4.0')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format [ type ]', 'output format', 'stylish')
  .action((filepath1, filepath2) => {
    console.log(gendiff(filepath1, filepath2, program.opts().format));
  })
  .parse(process.argv);
