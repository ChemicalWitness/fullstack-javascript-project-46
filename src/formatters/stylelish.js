import { nodeTypes } from '../buildDiff.js'

const stringifyStylish = (value, depth) => {
  if (value === null) {
    return 'null'
  }
  if (typeof value !== 'object') {
    return String(value)
  }

  const lines = Object.entries(value).map(
    ([key, val]) => `${buildIndent(depth + 1)}  ${key}: ${stringifyStylish(val, depth + 1)}`,
  )

  return ['{', ...lines, `${buildIndent(depth)}  }`].join('\n')
}

const buildIndent = (depth) => {
  const indentSize = depth * 4 - 2
  return ' '.repeat(indentSize)
}

const formatStylish = (nodes, depth) => {
  const indent = buildIndent(depth)
  return nodes.flatMap((node) => {
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
        return `${indent}  ${node.key}: {\n${formatStylish(node.children, depth + 1).join('\n')}\n${indent}  }`
      default:
        return `${indent}  ${node.key}: ${stringifyStylish(node.valueObj2, depth)}`
    }
  })
}

export default (nodes, depth) => `{\n${formatStylish(nodes, depth).join('\n')}\n}`
