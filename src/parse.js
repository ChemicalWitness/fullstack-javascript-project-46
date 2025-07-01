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

export { readFile, parse }
