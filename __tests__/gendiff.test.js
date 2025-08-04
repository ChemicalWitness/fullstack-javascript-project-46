import { fileURLToPath } from 'url'
import path, { dirname } from 'path'
import fs from 'fs'
import gendiff from '../index.js'
import { expect, test } from 'vitest'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const getFixturePath = filename => path.join(__dirname, '..', '__fixtures__', filename)

const expectedStylish = fs.readFileSync(getFixturePath('expected_diff_stylish.txt'), 'utf-8').trim()
const expectedPlain = fs.readFileSync(getFixturePath('expected_diff_plain.txt'), 'utf-8').trim()
const expectedJson = fs.readFileSync(getFixturePath('expected_diff.json'), 'utf-8').trim()
const formatsFile = ['json', 'yaml']

test.each(formatsFile)('gendiff for %s files', (extension) => {
  const file1 = getFixturePath(`file1.${extension}`)
  const file2 = getFixturePath(`file2.${extension}`)

  expect(gendiff(file1, file2, 'stylish')).toEqual(expectedStylish)
  expect(gendiff(file1, file2, 'plain')).toEqual(expectedPlain)
  expect(gendiff(file1, file2, 'json')).toEqual(expectedJson)
})
