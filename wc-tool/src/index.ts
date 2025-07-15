#!/usr/bin/env node
import { Command } from 'commander';
import { statSync, readFileSync } from 'fs';
const program = new Command();

program
  .name('ccwc')
  .description('A simple wc tool')
  .version('1.0.0')
  .option('-c', 'count of bytes in a file')
  .option('-l', 'count number of lines in a file')
  .argument('<path>')
  .action((path, options) => {
    if (options.c) {
      const stats = statSync(path);
      console.log(`${stats.size} ${path}` );
    }
    if (options.l) {
      const data = readFileSync(path, 'utf8');
      const lineCount = data.split('\n').length;
      console.log(`${lineCount} ${path}`);
    }
  });

program.parse(process.argv);