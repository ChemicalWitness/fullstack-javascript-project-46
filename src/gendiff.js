import _ from 'lodash'
import { Command } from 'commander'
import { parse, getFormat, readFile } from './parse.js'
import formatter from './formatter.js'

const nodeTypes = {
  ADDED: 'added',
  REMOVE: 'remove',
  CHANGE: 'change',
  UNCHANGED: 'unchanged',
  NESTED: 'nested',
}

const gendiff = (filepath1, filepath2, format = 'stylish') => {
  const data1 = parse(readFile(filepath1), getFormat(filepath1))
  const data2 = parse(readFile(filepath2), getFormat(filepath2))
  const diff = buildDiff(data1, data2)
  return formatter(diff, 1, format)
}

const buildDiff = (data1, data2) => {
  const keysObj1 = Object.keys(data1)
  const keysObj2 = Object.keys(data2)

  const uniqKeys = _.sortBy(Array.from(new Set([...keysObj1, ...keysObj2])))
  const diffLines = uniqKeys.map((key) => {
    const hasKeyInObj1 = keysObj1.includes(key)
    const hasKeyInObj2 = keysObj2.includes(key)
    const valueObj1 = data1[key]
    const valueObj2 = data2[key]

    if (!hasKeyInObj2) {
      return { type: nodeTypes.REMOVE, key, valueObj1 }
    }
    if (!hasKeyInObj1) {
      return { type: nodeTypes.ADDED, key, valueObj2 }
    }
    if (_.isObject(valueObj1) && _.isObject(valueObj2)) {
      return { type: nodeTypes.NESTED, key, children: buildDiff(valueObj1, valueObj2) }
    }
    if (!_.isEqual(valueObj1, valueObj2)) {
      return { type: nodeTypes.CHANGE, key, valueObj1, valueObj2 }
    }
    if (valueObj1 === valueObj2) {
      return { type: nodeTypes.UNCHANGED, key, valueObj2 }
    }
  })

  return diffLines
}

const runCommander = () => {
  const program = new Command()

  program
    .name('gendiff')
    .description('Compares two configuration files and shows a difference.')
    .version('1.0.0', '-V, --version', 'output the version number')
    .option('-f, --format <type>', 'output format', 'stylish')
    .arguments('<filepath1> <filepath2>')
    .helpOption('-h, --help', 'display help for command')
    .action((filepath1, filepath2, options) => console.log(gendiff(filepath1, filepath2, options.format)))

  return program
}

export { gendiff, runCommander, nodeTypes }
