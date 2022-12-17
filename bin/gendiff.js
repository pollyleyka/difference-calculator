#!/usr/bin/env node
import { Command } from 'commander';
import gendiff from '../src/index.js';

const program = new Command();
program
  .name('gendiff')
  .version('0.4.0')
  .arguments('<filePath1> <filePath2>')
  .option('-f, --format [ type ]', 'output format', 'stylish')
  .action((filePath1, filePath2) => gendiff(filePath1, filePath2, program.opts().format))
  .parse();
