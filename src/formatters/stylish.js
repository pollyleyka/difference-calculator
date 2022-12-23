import _ from 'lodash';

const space = ' ';
const spaceCount = 4;
const generateIndent = (depth, extraIndent = 0) => {
  const indentSize = (depth * spaceCount) + extraIndent;
  return space.repeat(indentSize);
};
const stringify = (value, depth) => {
  if (!_.isObject(value)) {
    return `${value}`;
  }
  const lines = Object
    .entries(value)
    .map(([key, val]) => `${generateIndent(depth)}${key}: ${stringify(val, (depth + 1))}`);
  return ['{', ...lines, `${generateIndent(depth - 1)}}`].join('\n');
};

const stylish = (tree) => {
  const iter = (node, iterDepth = 1) => {
    const lines = node
      .map((data) => {
        const { type } = data;
        switch (type) {
          case 'added': {
            const { key, value } = data;
            return `${generateIndent(iterDepth, -2)}+ ${key}: ${stringify(value, iterDepth + 1)}`;
          }
          case 'deleted': {
            const { key, value } = data;
            return `${generateIndent(iterDepth, -2)}- ${key}: ${stringify(value, iterDepth + 1)}`;
          }
          case 'unchanged': {
            const { key, value } = data;
            return `${generateIndent(iterDepth)}${key}: ${stringify(value, iterDepth + 1)}`;
          }
          case 'changed': {
            const { key, changedFrom, changedTo } = data;
            const changedFromLine = `${generateIndent(iterDepth, -2)}- ${key}: ${stringify(changedFrom, iterDepth + 1)}`;
            const changedToLine = `${generateIndent(iterDepth, -2)}+ ${key}: ${stringify(changedTo, iterDepth + 1)}`;
            return [changedFromLine, changedToLine];
          }
          case 'nested': {
            const { key, children } = data;
            return `${generateIndent(iterDepth)}${key}: ${stringify(iter(children, iterDepth + 1), iterDepth + 1)}`;
          }
          default:
            throw new Error(`Node type ${type} is not defined`);
        }
      });
    return ['{', ...lines.flat(), `${generateIndent(iterDepth - 1)}}`].join('\n');
  };
  return iter(tree, 1);
};

export default stylish;
