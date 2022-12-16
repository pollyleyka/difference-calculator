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
    const lines = node.map((obj) => {
      const { type } = obj;
      switch (type) {
        case 'added': {
          const { name, value } = obj;
          return `${generateIndent(iterDepth, -2)}+ ${name}: ${stringify(value, iterDepth + 1)}`;
        }
        case 'deleted': {
          const { name, value } = obj;
          return `${generateIndent(iterDepth, -2)}- ${name}: ${stringify(value, iterDepth + 1)}`;
        }
        case 'unchanged': {
          const { name, value } = obj;
          return `${generateIndent(iterDepth)}${name}: ${stringify(value, iterDepth + 1)}`;
        }
        case 'changed': {
          const { name, changedFrom, changedTo } = obj;
          const changedFromLine = `${generateIndent(iterDepth, -2)}- ${name}: ${stringify(changedFrom, iterDepth + 1)}`;
          const changedToLine = `${generateIndent(iterDepth, -2)}+ ${name}: ${stringify(changedTo, iterDepth + 1)}`;
          return [changedFromLine, changedToLine];
        }
        case 'withNested': {
          const { name, children } = obj;
          return `${generateIndent(iterDepth)}${name}: ${stringify(iter(children, iterDepth + 1), iterDepth + 1)}`;
        }
        default:
          throw new Error('Unknown line type');
      }
    });
    return ['{', ...lines.flat(), `${generateIndent(iterDepth - 1)}}`].join('\n');
  };
  return iter(tree, 1);
};

export default stylish;
