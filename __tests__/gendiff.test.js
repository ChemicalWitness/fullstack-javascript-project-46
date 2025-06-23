import { fileURLToPath } from 'url'
import path, { dirname } from 'path'
import fs from 'fs'
import { gendiff } from '../src/gendiff.js'
import { describe, expect, test } from 'vitest'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const getFixturePath = filename => path.join(__dirname, '..', '__fixtures__', filename)

describe('gendiff', () => {
  test('should show differences between two JSON YAML files', () => {
    const file1 = getFixturePath('file1.1.json')
    const file2 = getFixturePath('file2.1.yaml')
    const expected = fs.readFileSync(getFixturePath('expected_diff2.txt'), 'utf-8').trim()
    expect(gendiff(file1, file2)).toEqual(expected)
  })
})
