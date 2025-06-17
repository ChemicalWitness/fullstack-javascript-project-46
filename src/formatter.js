import { nodeTypes } from './gendiff.js'

const stringify = (value, depth) => {
  if (value === null) {
    return 'null'
  }
  if (typeof value !== 'object') {
    return String(value)
  }

  const indentSize = depth * 4
  const currentIndent = ' '.repeat(indentSize)
  const bracketIndent = ' '.repeat(indentSize - 4)
  const lines = Object.entries(value).map(
    ([key, val]) => `${currentIndent}${key}: ${stringify(val, depth + 1)}`,
  )

  return ['{', ...lines, `${bracketIndent}}`].join('\n')
}

const formatStylish = (nodes, depth = 1) => {
  const indentSize = depth * 4
  const currentIndent = ' '.repeat(indentSize - 2)
  const bracketIndent = ' '.repeat(indentSize - 4)
  const diff = nodes.flatMap((node) => {
    switch (node.type) {
      case nodeTypes.REMOVE:
        return `${currentIndent}- ${node.key}: ${stringify(node.valueObj1, depth + 1)}`
      case nodeTypes.ADDED:
        return `${currentIndent}+ ${node.key}: ${stringify(node.valueObj2, depth + 1)}`
      case nodeTypes.CHANGE:
        return [
          `${currentIndent}- ${node.key}: ${stringify(node.valueObj1, depth + 1)}`,
          `${currentIndent}+ ${node.key}: ${stringify(node.valueObj2, depth + 1)}`,
        ]
      case nodeTypes.NESTED:
        return `${currentIndent}  ${node.key}: ${formatter(node.children, depth + 1)}`
      default:
        return `${currentIndent}  ${node.key}: ${stringify(node.valueObj2, depth + 1)}`
    }
  })

  return [`{`, ...diff, `${bracketIndent}}`].join('\n')
}

const formatter = (nodes, depth, format = 'stylish') => {
  if (format != 'stylish') {
    throw new Error('Uncorrect format')
  }
  return formatStylish(nodes, depth)
}

export default formatter
