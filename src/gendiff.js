import path from 'path'
import fs from 'fs'
import parse from './parse.js'
import formatter from './formatter.js'
import { buildDiff } from './buildDiff.js'

const readFile = (filepath) => {
  const absolutePath = path.resolve(process.cwd(), filepath)
  return fs.readFileSync(absolutePath, 'utf-8')
}

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
