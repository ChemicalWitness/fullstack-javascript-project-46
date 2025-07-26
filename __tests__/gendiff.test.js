import { fileURLToPath } from 'url'
import path, { dirname } from 'path'
import fs from 'fs'
import gendiff from '../index.js'
import { describe, expect, test } from 'vitest'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const getFixturePath = filename => path.join(__dirname, '..', '__fixtures__', filename)

const expectedStylish = fs.readFileSync(getFixturePath('expected_diff_stylish.txt'), 'utf-8').trim()
const expectedPlain = fs.readFileSync(getFixturePath('expected_diff_plain.txt'), 'utf-8').trim()
const expectedJson = fs.readFileSync(getFixturePath('expected_diff.json'), 'utf-8').trim()
const formatsFile = ['json', 'yaml']
const formats = [
  { name: 'Stylish', format: 'stylish', expected: expectedStylish },
  { name: 'Plain', format: 'plain', expected: expectedPlain },
  { name: 'Json', format: 'json', expected: expectedJson },
]

const testCases = formats.flatMap(({ name, format, expected }) =>
  formatsFile.map(file => ({
    name,
    format,
    expected,
    file,
  })))

describe('gendiff', () => {
  test.each(testCases)('test $name for $file', ({ format, expected, file }) => {
    const file1 = getFixturePath(`file1.${file}`)
    const file2 = getFixturePath(`file2.${file}`)
    expect(gendiff(file1, file2, format)).toEqual(expected)
  })
})
