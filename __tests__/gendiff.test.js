import { fileURLToPath } from 'url'
import path, { dirname } from 'path'
import fs from 'fs'
import { checkPath } from '../src/gendiff.js'
import { describe, expect, test } from 'vitest'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const getFixturePath = filename => path.join(__dirname, '..', '__fixtures__', filename)

describe('gendiff', () => {
  test('should show differences between two flat JSON files', () => {
    const file1 = getFixturePath('file1.json')
    const file2 = getFixturePath('file2.json')
    const expected = fs.readFileSync(getFixturePath('expected_diff.txt'), 'utf-8').trim()
    console.log(expected)
    expect(checkPath(file1, file2)).toEqual(expected)
  })
})
