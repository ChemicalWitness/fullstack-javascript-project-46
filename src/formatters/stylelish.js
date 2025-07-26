import { nodeTypes } from '../buildDiff.js'
import formatter from '../formatter.js'

const stringifyStylish = (value, depth) => {
  if (value === null) {
    return 'null'
  }
  if (typeof value !== 'object') {
    return String(value)
  }

  const lines = Object.entries(value).map(
    ([key, val]) => `${buildIndent(depth)}${key}: ${stringifyStylish(val, depth + 1)}`,
  )

  return ['{', ...lines, `${buildIndent(depth - 1)}}`].join('\n')
}

const buildIndent = (depth) => {
  const indentSize = depth * 4
  return ' '.repeat(indentSize)
}

const formatStylish = (nodes, depth = 1) => {
  const indent = buildIndent(depth).slice(0, -2)
  const diff = nodes.flatMap((node) => {
    switch (node.type) {
      case nodeTypes.REMOVE:
        return `${indent}- ${node.key}: ${stringifyStylish(node.valueObj1, depth + 1)}`
      case nodeTypes.ADDED:
        return `${indent}+ ${node.key}: ${stringifyStylish(node.valueObj2, depth + 1)}`
      case nodeTypes.CHANGE:
        return [
          `${indent}- ${node.key}: ${stringifyStylish(node.valueObj1, depth + 1)}`,
          `${indent}+ ${node.key}: ${stringifyStylish(node.valueObj2, depth + 1)}`,
        ]
      case nodeTypes.NESTED:
        return `${indent}  ${node.key}: ${formatter(node.children, 'stylish', depth + 1)}`
      default:
        return `${indent}  ${node.key}: ${stringifyStylish(node.valueObj2, depth + 1)}`
    }
  })

  return [`{`, ...diff, `${buildIndent(depth - 1)}}`].join('\n')
}

export default formatStylish
