import _ from 'lodash';

const stringify = (value) => {
  const space = '    ';
  const count = 1;
  const iter = (currentValue, depth = 2) => {
    if (!_.isObject(currentValue)) {
      return `${currentValue}`;
    }

    const indentSize = depth * count;
    const currentIndent = space.repeat(indentSize);
    const bracketIndent = space.repeat(indentSize - count);
    const lines = Object
      .entries(currentValue)
      .map(([key, val]) => `${currentIndent}${key}: ${iter(val, (depth + 1))}`);

    return [
      '{',
      ...lines,
      `${bracketIndent}}`,
    ].join('\n');
  };

  return iter(value, 1);
};

const generateOutput = (tree) => {
  const lines = tree.map((obj) => {
    const {
      name,
      type,
      value,
      children,
      changedFrom,
      changedTo,
    } = obj;
    switch (type) {
      case 'added':
        return `+ ${name}: ${stringify(value)}`;
      case 'deleted':
        return `- ${name}: ${stringify(value)}`;
      case 'unchanged':
        return `  ${name}: ${stringify(value)}`;
      case 'changed':
        return `- ${name}: ${stringify(changedFrom)}\n+ ${name}: ${stringify(changedTo)}`;
      case 'withNested':
        return `  ${name}: ${stringify(generateOutput(children))}`;
      default:
        throw new Error(`unexpected value ${type}`);
    }
  });
  return [
    '{',
    ...lines,
    '}',
  ].join('\n');
};

export default generateOutput;
