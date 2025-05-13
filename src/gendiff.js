import { Command } from 'commander';
import { parse, getFormat, readFile } from './parse.js';

const checkPath = (filepath1, filepath2) => {
  const data1 = parse(readFile(filepath1), getFormat(filepath1));
  const data2 = parse(readFile(filepath2), getFormat(filepath2));
  console.log(data1);
  console.log(data2);

  return console.log('Comparing...');
};

const runCommander = () => {
  const program = new Command();

  program
    .name('gendiff')
    .description('Compares two configuration files and shows a difference.')
    .version('1.0.0', '-V, --version', 'output the version number')
    .option('-f, --format [type]', 'output format')
    .arguments('<filepath1> <filepath2>')
    .helpOption('-h, --help', 'display help for command')
    .action((filepath1, filepath2) => checkPath(filepath1, filepath2));

  return program;
};

export { checkPath, runCommander };
