import { fileURLToPath } from 'url'
import path, { dirname } from 'path'
import fs from 'fs'
import gendiff from '../index.js'
import { describe, expect, test } from 'vitest'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const getFixturePath = filename => path.join(__dirname, '..', '__fixtures__', filename)

describe('gendiff', () => {
  test('should show differences between two JSON YAML files format stylish', () => {
    const file1 = getFixturePath('file1.json')
    const file2 = getFixturePath('file2.yaml')
    const expected = fs.readFileSync(getFixturePath('expected_diff_stylish.txt'), 'utf-8').trim()
    expect(gendiff(file1, file2)).toEqual(expected)
  }),
  test('should show differences between two JSON YAML files format stylish', () => {
    const file1 = getFixturePath('file1.json')
    const file2 = getFixturePath('file2.json')
    const expected = fs.readFileSync(getFixturePath('expected_diff_stylish.txt'), 'utf-8').trim()
    expect(gendiff(file1, file2)).toEqual(expected)
  }),
  test('should show differences between two YAML files format stylish', () => {
    const file1 = getFixturePath('file1.yaml')
    const file2 = getFixturePath('file2.yaml')
    const expected = fs.readFileSync(getFixturePath('expected_diff_stylish.txt'), 'utf-8').trim()
    expect(gendiff(file1, file2)).toEqual(expected)
  }),
  test('should show differences between two JSON YAML files format plain', () => {
    const file1 = getFixturePath('file1.json')
    const file2 = getFixturePath('file2.yaml')
    const format = 'plain'
    const expected = fs.readFileSync(getFixturePath('expected_diff_plain.txt'), 'utf-8').trim()
    expect(gendiff(file1, file2, format)).toEqual(expected)
  }),
  test('should show differences between two JSON files format plain', () => {
    const file1 = getFixturePath('file1.json')
    const file2 = getFixturePath('file2.json')
    const format = 'plain'
    const expected = fs.readFileSync(getFixturePath('expected_diff_plain.txt'), 'utf-8').trim()
    expect(gendiff(file1, file2, format)).toEqual(expected)
  }),
  test('should show differences between two YAML files format plain', () => {
    const file1 = getFixturePath('file1.yaml')
    const file2 = getFixturePath('file2.yaml')
    const format = 'plain'
    const expected = fs.readFileSync(getFixturePath('expected_diff_plain.txt'), 'utf-8').trim()
    expect(gendiff(file1, file2, format)).toEqual(expected)
  }),
  test('should show differences betweew two files on json format', () => {
    const file1 = getFixturePath('file1.json')
    const file2 = getFixturePath('file2.yaml')
    const format = 'json'
    const expected = fs.readFileSync(getFixturePath('expected_diff.json'), 'utf-8').trim()
    expect(gendiff(file1, file2, format)).toEqual(expected)
  })
})
