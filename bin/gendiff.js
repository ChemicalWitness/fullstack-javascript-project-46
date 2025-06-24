#!/usr/bin/env node
import { Command } from 'commander'
import gendiff from '../index.js'

const runCommander = () => {
  const program = new Command()

  program
    .name('gendiff')
    .description('Compares two configuration files and shows a difference.')
    .version('1.0.0', '-V, --version', 'output the version number')
    .option('-f, --format <type>', 'output format', 'stylish')
    .arguments('<filepath1> <filepath2>')
    .helpOption('-h, --help', 'display help for command')
    .action((filepath1, filepath2, options) => {
      try {
        console.log(gendiff(filepath1, filepath2, options.format))
      }
      catch (err) {
        console.error(err)
        return
      }
    })

  return program
}

const program = runCommander()
program.parse(process.argv)
