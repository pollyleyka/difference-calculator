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
      .filter((data) => data.type !== 'unchanged')
      .map((data) => {
        const { type } = data;
        switch (type) {
          case 'added': {
            const { key, value } = data;
            return `Property '${getFullName(parentNames, key)}' was added with value: ${stringify(value)}`;
          }
          case 'deleted': {
            const { key } = data;
            return `Property '${getFullName(parentNames, key)}' was removed`;
          }
          case 'changed': {
            const { key, changedFrom, changedTo } = data;
            return `Property '${getFullName(parentNames, key)}' was updated. From ${stringify(changedFrom)} to ${stringify(changedTo)}`;
          }
          case 'withNested': {
            const { key, children } = data;
            const newParentsName = getFullName(parentNames, key);
            return iter(children, [newParentsName]);
          }
          default:
            throw new Error(`Node type ${type} is not defined`);
        }
      });
    return `${lines.join('\n')}`;
  };
  return iter(tree);
};

export default plain;
