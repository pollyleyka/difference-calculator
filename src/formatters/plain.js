import _ from 'lodash';

const stringify = (value) => {
  if (_.isPlainObject(value)) {
    return '[complex value]';
  }
  if (_.isString(value)) {
    return `'${value}'`;
  }
  return String(value);
};

const getFullName = (parentNames, name) => [...parentNames, name].join('.');

const plain = (tree) => {
  const iter = (node, parentNames = []) => {
    const lines = node
      .filter((value) => value.type !== 'unchanged')
      .map((obj) => {
        const { type } = obj;
        switch (type) {
          case 'added': {
            const { name, value } = obj;
            return `Property '${getFullName(parentNames, name)}' was added with value: ${stringify(value)}`;
          }
          case 'deleted': {
            const { name } = obj;
            return `Property '${getFullName(parentNames, name)}' was removed`;
          }
          case 'changed': {
            const { name, changedFrom, changedTo } = obj;
            return `Property '${getFullName(parentNames, name)}' was updated. From ${stringify(changedFrom)} to ${stringify(changedTo)}`;
          }
          case 'withNested': {
            const { name, children } = obj;
            const newParentsName = getFullName(parentNames, name);
            return iter(children, [newParentsName]);
          }
        // case 'unchanged':
        //   return 1;
          default:
            throw new Error('Tree is not defined');
        }
      });
    console.log(lines);
    const result = `${lines.join('\n')}`;
    console.log(result);
    return result;
  };
  return iter(tree);
};

export default plain;

// const getPropertyName = (properties, property) => [...properties, property].join('.');

// const plain2 = (node, properties) => {
//   switch (node.type) {
//     case 'root': {
//       const output = node.children.flatMap((child) => plain2(child, properties));
//       return output.join('\n');
//     }
//     case 'added':
//       return `Property '${getPropertyName(properties, node.key)}' was added with value: ${stringify(node.value)}`;
//     case 'removed':
//       return `Property '${getPropertyName(properties, node.key)}' was removed`;
//     case 'changed':
//       return `Property '${getPropertyName(properties, node.key)}' was updated. From ${stringify(node.value1)} to ${stringify(node.value2)}`;
//     case 'unchanged':
//       return [];
//     case 'nested': {
//       const output = node.children.flatMap((child) => plain2(child, [...properties, node.key]));
//       return output.join('\n');
//     }
//     default:
//       throw new Error('Tree is not defined');
//   }
// };

// const plain = (tree) => plain2(tree, []);
