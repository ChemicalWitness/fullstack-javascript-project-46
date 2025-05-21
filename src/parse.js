import fs from 'fs'
import path from 'path'

const readFile = (filepath) => {
  const absolutePath = path.resolve(process.cwd(), filepath)
  return fs.readFileSync(absolutePath, 'utf-8')
}

const parse = (file, format) => {
  return format === 'json' ? JSON.parse(file) : new Error('Invalid format')
}

const getFormat = (filepath) => {
  const ext = path.extname(filepath).slice(1).toLowerCase()
  return ext
}

export { readFile, parse, getFormat }
