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
    ([key, val]) => `${buildIndent(depth + 1)}${key}: ${stringifyStylish(val, depth + 1)}`,
  )

  return ['{', ...lines, `${buildIndent(depth)}}`].join('\n')
}

const buildIndent = (depth, isSign = false) => {
  const indentSize = depth * 4 - (isSign ? 2 : 0)
  return ' '.repeat(indentSize)
}

const formatStylish = (nodes, depth) => {
  const indent = buildIndent(depth, true)
  const diff = nodes.flatMap((node) => {
    switch (node.type) {
      case nodeTypes.REMOVE:
        return `${indent}- ${node.key}: ${stringifyStylish(node.valueObj1, depth)}`
      case nodeTypes.ADDED:
        return `${indent}+ ${node.key}: ${stringifyStylish(node.valueObj2, depth)}`
      case nodeTypes.CHANGE:
        return [
          `${indent}- ${node.key}: ${stringifyStylish(node.valueObj1, depth)}`,
          `${indent}+ ${node.key}: ${stringifyStylish(node.valueObj2, depth)}`,
        ]
      case nodeTypes.NESTED:
        return `${indent}  ${node.key}: ${formatter(node.children, 'stylish', depth + 1)}`
      default:
        return `${indent}  ${node.key}: ${stringifyStylish(node.valueObj2, depth)}`
    }
  })

  return [`{`, ...diff, `${buildIndent(depth - 1)}}`].join('\n')
}

export default formatStylish
