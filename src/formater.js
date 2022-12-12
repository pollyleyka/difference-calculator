import _ from 'lodash';

const generateOutput = (tree) => {
  const iter = (node, iterDepth = 1) => {
    const space = ' ';
    let spaceCount;
    if (iterDepth === 1) {
      spaceCount = 'hi';
    }
    spaceCount = 4;
    const indentSize = iterDepth * spaceCount;
    const currentIndent = space.repeat(indentSize);
    const bracketIndent = space.repeat(indentSize - iterDepth);

    const stringify = (value, depth = 1) => {
      if (!_.isObject(value)) {
        return `${value}`;
      }
      const indentSizestr = depth * spaceCount;
      const currentIndentstr = space.repeat(indentSizestr);
      const bracketIndentstr = space.repeat(indentSizestr - depth);
      const lines = Object
        .entries(value)
        .map(([key, val]) => `${currentIndentstr}${key}: ${stringify(val, (depth + 1))}`);
      return ['{', ...lines, `${bracketIndentstr}}`].join('\n');
    };

    const lines = node.map((obj) => {
      const { name, type, value, children, changedFrom, changedTo } = obj;
      const text = `${name}: ${stringify(value)}`;
      const oldText = `${name}: ${stringify(changedFrom)}`;
      const newText = `${name}: ${stringify(changedTo)}`;
      switch (type) {
        case 'added':
          return `${space.repeat(indentSize - 2)}+ ${text}`;
        case 'deleted':
          return `${space.repeat(indentSize - 2)}- ${text}`;
        case 'unchanged':
          return `${currentIndent}${text}`;
        case 'changed':
          return `${space.repeat(indentSize - 2)}- ${oldText}\n${space.repeat(indentSize - 2)}+ ${newText}`;
        case 'withNested':
          return `${space.repeat(indentSize - 2)}${name}: ${stringify(iter(children, iterDepth + 1), iterDepth + 1)}`;
        default:
          throw new Error(`unexpected value ${type}`);
      }
    });
    return ['{', ...lines, `${bracketIndent}}`].join('\n');
  };
  return iter(tree, 1);
};

export default generateOutput;
