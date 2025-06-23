import fs from 'fs'
import path from 'path'
import yaml from 'js-yaml'

const readFile = (filepath) => {
  const absolutePath = path.resolve(process.cwd(), filepath)
  return fs.readFileSync(absolutePath, 'utf-8')
}

const parse = (file, format) => {
  if (format === 'json') {
    return JSON.parse(file)
  }
  else if (format === 'yml' || format === 'yaml') {
    return yaml.load(file)
  }
  return new Error('invalid format')
}

const getFormat = (filepath) => {
  const ext = path.extname(filepath).slice(1).toLowerCase()
  return ext
}

const getData = (filepath) => {
  const data = parse(readFile(filepath), getFormat(filepath))
  return data
}

export { readFile, parse, getFormat, getData }
