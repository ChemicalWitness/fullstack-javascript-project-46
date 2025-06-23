import formatStylish from './formatters/stylelish.js'
import formatPlain from './formatters/plain.js'

const formatter = (nodes, depth, format = 'stylish') => {
  if (format != 'stylish') {
    return formatPlain(nodes)
  }
  return formatStylish(nodes, depth)
}

export default formatter
