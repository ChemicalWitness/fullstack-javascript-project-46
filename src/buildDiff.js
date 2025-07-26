import _ from 'lodash'

const nodeTypes = {
  ADDED: 'added',
  REMOVE: 'remove',
  CHANGE: 'change',
  UNCHANGED: 'unchanged',
  NESTED: 'nested',
}

const buildDiff = (data1, data2) => {
  const keysObj1 = Object.keys(data1)
  const keysObj2 = Object.keys(data2)
  console.log(keysObj1)

  const uniqKeys = Array.from(new Set([...keysObj1, ...keysObj2])).toSorted()
  const diffLines = uniqKeys.map((key) => {
    const valueObj1 = data1[key]
    const valueObj2 = data2[key]

    if (!Object.hasOwn(data2, key)) {
      return { type: nodeTypes.REMOVE, key, valueObj1 }
    }
    if (!Object.hasOwn(data1, key)) {
      return { type: nodeTypes.ADDED, key, valueObj2 }
    }
    if (_.isPlainObject(valueObj1) && _.isPlainObject(valueObj2)) {
      return { type: nodeTypes.NESTED, key, children: buildDiff(valueObj1, valueObj2) }
    }
    if (!_.isEqual(valueObj1, valueObj2)) {
      return { type: nodeTypes.CHANGE, key, valueObj1, valueObj2 }
    }
    return { type: nodeTypes.UNCHANGED, key, valueObj2 }
  })

  return diffLines
}

export { nodeTypes, buildDiff }
