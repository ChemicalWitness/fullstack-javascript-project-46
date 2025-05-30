import fs from 'fs'
import path from 'path'
import yaml from 'js-yaml'

const readFile = (filepath) => {
  const absolutePath = path.resolve(process.cwd(), filepath)
  return fs.readFileSync(absolutePath, 'utf-8')
}

const parse = (file, format) => {
  // return format === 'json' ? JSON.parse(file) : new Error('Invalid format')
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

export { readFile, parse, getFormat }
