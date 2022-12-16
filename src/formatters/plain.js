import _ from 'lodash';

const stringify = (value) => {
  if (_.isPlainObject(value)) {
    return '[complex value]';
  }
  if (_.isString(value)) {
    return `'${value}'`;
  }
  return `${value}`;
};

const getFullName = (parentNames, name) => [...parentNames, name].join('.');

const plain = (tree) => {
  const iter = (node, parentNames = []) => {
    const lines = node
      .filter((obj) => obj.type !== 'unchanged')
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
          default:
            throw new Error('Tree is not defined');
        }
      });
    return `${lines.join('\n')}`;
  };
  return iter(tree);
};

export default plain;
