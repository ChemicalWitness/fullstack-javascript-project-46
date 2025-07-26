import yaml from 'js-yaml'

const parse = (file, format) => {
  if (format === 'json') {
    return JSON.parse(file)
  }
  else if (format === 'yml' || format === 'yaml') {
    return yaml.load(file)
  }
  return new Error('invalid format')
}

export default parse
