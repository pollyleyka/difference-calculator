#!/usr/bin/env node
import { program } from 'commander';
import gendiff from '../src/index.js'

program
    .name('gendiff')
    .description('Compares two configuration files and shows a difference.')
    .version('0.1.0')
    .argument('<filePath1>')
    .argument('<filePath1>')
    .helpOption(true, 'output usage information')
    .option('-f, --format < type >', 'output format', )
    .action(gendiff);

program.parse();


