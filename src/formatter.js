import formatStylish from './formatters/stylelish.js'
import formatPlain from './formatters/plain.js'

const formatter = (nodes, depth, format = 'stylish') => {
  if (format === 'plain') {
    return formatPlain(nodes)
  }
  if (format === 'stylish') {
    return formatStylish(nodes, depth)
  }
  return JSON.stringify(nodes)
}

export default formatter
