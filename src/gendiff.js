import path from 'path'
import { parse, readFile } from './parse.js'
import formatter from './formatter.js'
import { buildDiff } from './buildDiff.js'

const getFormat = (filepath) => {
  const ext = path.extname(filepath).slice(1).toLowerCase()
  return ext
}

const getData = (filepath) => {
  const data = parse(readFile(filepath), getFormat(filepath))
  return data
}

const gendiff = (filepath1, filepath2, format = 'stylish') => {
  const data1 = getData(filepath1)
  const data2 = getData(filepath2)
  const diff = buildDiff(data1, data2)
  return formatter(diff, format)
}

export { gendiff }
