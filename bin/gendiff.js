#!/usr/bin/env node
import { program } from 'commander';

const command = (file1 = 1, file2 = 2) => {
    console.log(`compare ${file1} and ${file2}`);
}

program
    .name('gendiff')
    .description('CLI')
    .version('0.1.0')
    .action(command);

program.command('gendiff')
    .description('Compares two configuration files and shows a difference.')
    .option('-V, --version', 'output the version number')
    .helpOption(true, 'output usage information');

program.parse();


