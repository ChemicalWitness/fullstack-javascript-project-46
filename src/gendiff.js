import _ from 'lodash';
import { Command } from 'commander';
import { parse, getFormat, readFile } from './parse.js';

const checkPath = (filepath1, filepath2) => {
  const data1 = parse(readFile(filepath1), getFormat(filepath1));
  const data2 = parse(readFile(filepath2), getFormat(filepath2));
  // console.log(data1);
  // console.log(data2);
  const keysObj1 = Object.keys(data1);
  const keysObj2 = Object.keys(data2);

  const uniqKeys = _.sortBy(Array.from(new Set([...keysObj1, ...keysObj2])));
  const diffLines = uniqKeys.map((key) => {
    const valueObj1 = data1[key];
    const valueObj2 = data2[key];

    if (!_.has(data2, key)) {
      return `  - ${key}: ${valueObj1}`;
    }
    if (!_.has(data1, key)) {
      return `  + ${key}: ${valueObj2}`;
    }
    if (!_.isEqual(valueObj1, valueObj2)) {
      return `  - ${key}: ${valueObj1}\n  + ${key}: ${valueObj2}`;
    }
    return `  ${key}: ${valueObj1}`;
  });

  return console.log(`{\n${diffLines.join('\n')}\n}`);
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
