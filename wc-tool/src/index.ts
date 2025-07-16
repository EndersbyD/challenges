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
  .option('-w', 'count the number of words in a file')
  .option('-m', 'count the number of characters in a file')
  .argument('[path]')
  .action((path, options) => {
    if (path) {
      const stats = statSync(path);
      const data = readFileSync(path, 'utf8');
      handleData(data, path);
    } else {
      // Read from stdin
      let input = '';
      process.stdin.setEncoding('utf8');
      process.stdin.on('data', chunk => input += chunk);
      process.stdin.on('end', () => {
        handleData(input, '');
      });
      process.stdin.resume();
    }

    function handleData(data: string, path: string) {
      const lineCount = data === '' ? 0 : data.split('\n').length - (data.endsWith('\n') ? 1 : 0);
      const words = data.match(/\S+/g);
      const wordCount = words ? words.length : 0;

      if (Object.keys(options).length === 0) {
        console.log(`${lineCount} ${wordCount} ${data.length} ${path}`);
      }
      if (options.c) {
        console.log(`${data.length} ${path}`);
      }
      if (options.l) {
        console.log(`${lineCount} ${path}`);
      }
      if (options.w) {
        console.log(`${wordCount} ${path}`);
      }
      if (options.m) {
        console.log(`${data.length} ${path}`);
      }
    }
  });

program.parse(process.argv);