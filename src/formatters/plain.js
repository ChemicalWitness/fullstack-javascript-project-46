import { nodeTypes } from '../buildDiff.js'

const stringifyPlain = (value) => {
  if (value === null) {
    return null
  }
  if (typeof value === 'object') {
    return `[complex value]`
  }
  return typeof value !== 'string' ? `${value}` : `'${value}'`
}

const buildPath = (path, key) => path ? `${path}.${key}` : key

const formatPlain = (nodes, path = '') => {
  const diff = nodes.flatMap((node) => {
    const currentPath = buildPath(path, node.key)
    switch (node.type) {
      case nodeTypes.REMOVE:
        return `Property '${currentPath}' was removed`
      case nodeTypes.ADDED:
        return `Property '${currentPath}' was added with value: ${stringifyPlain(node.valueObj2)}`
      case nodeTypes.CHANGE:
        return `Property '${currentPath}' was updated. From ${stringifyPlain(node.valueObj1)} to ${stringifyPlain(node.valueObj2)}`
      case nodeTypes.NESTED:
        return formatPlain(node.children, currentPath)
      case nodeTypes.UNCHANGED:
        return []
    }
  })

  return diff.join('\n')
}

export default formatPlain
