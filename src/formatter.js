import { nodeTypes } from './gendiff.js'

const stringifyStylish = (value, depth) => {
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
    ([key, val]) => `${currentIndent}${key}: ${stringifyStylish(val, depth + 1)}`,
  )
  console.log(lines)

  return ['{', ...lines, `${bracketIndent}}`].join('\n')
}

const stringifyPlain = (value) => {
  if (value === null) {
    return null
  }
  if (typeof value === 'object') {
    return `[complex value]`
  }
  return String(value)
}

const buildPath = (path, key) => path ? `${path}.${key}` : key
const formatStylish = (nodes, depth = 1) => {
  const indentSize = depth * 4
  const currentIndent = ' '.repeat(indentSize - 2)
  const bracketIndent = ' '.repeat(indentSize - 4)
  const diff = nodes.flatMap((node) => {
    switch (node.type) {
      case nodeTypes.REMOVE:
        return `${currentIndent}- ${node.key}: ${stringifyStylish(node.valueObj1, depth + 1)}`
      case nodeTypes.ADDED:
        return `${currentIndent}+ ${node.key}: ${stringifyStylish(node.valueObj2, depth + 1)}`
      case nodeTypes.CHANGE:
        return [
          `${currentIndent}- ${node.key}: ${stringifyStylish(node.valueObj1, depth + 1)}`,
          `${currentIndent}+ ${node.key}: ${stringifyStylish(node.valueObj2, depth + 1)}`,
        ]
      case nodeTypes.NESTED:
        return `${currentIndent}  ${node.key}: ${formatter(node.children, depth + 1)}`
      default:
        return `${currentIndent}  ${node.key}: ${stringifyStylish(node.valueObj2, depth + 1)}`
    }
  })

  return [`{`, ...diff, `${bracketIndent}}`].join('\n')
}

const formatPlain = (nodes, path = '') => {
  const diff = nodes.flatMap((node) => {
    const currentPath = buildPath(path, node.key);
    switch (node.type) {
      case nodeTypes.REMOVE:
        return `Property ${currentPath} was removed`
      case nodeTypes.ADDED:
        return `Property ${currentPath} was added with value: ${stringifyPlain(node.valueObj2)}`
      case nodeTypes.CHANGE:
        return `Property ${currentPath} was updated. From ${stringifyPlain(node.valueObj1)} to ${stringifyPlain(node.valueObj2)}`
      case nodeTypes.NESTED:
        return formatPlain(node.children, currentPath)
      case nodeTypes.UNCHANGED:
        return []
    }
  })

  return diff.join('\n')
}

const formatter = (nodes, depth, format = 'stylish') => {
  if (format != 'stylish') {
    return formatPlain(nodes)
  }
  return formatStylish(nodes, depth)
}

export default formatter
