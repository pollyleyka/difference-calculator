import _ from 'lodash';

const plain = (tree) => {
  const iter = (node) => {
    const lines = node.filter((obj) => {
      const { type } = obj;
      if (type === 'added') {
        const { name } = obj;
        let { value } = obj;
        if (_.isObject(value)) {
          value = '[complex value]';
        }
        return `Property '${name}' was added with value: ${value}`;
      }
      if (type === 'deleted') {
        const { name } = obj;
        return `Property '${name}' was removed`;
      }
      if (type === 'changed') {
        const { name } = obj;
        let { changedFrom, changedTo } = obj;
        if (_.isObject(changedFrom)) {
          changedFrom = '[complex value]';
        }
        if (_.isObject(changedTo)) {
          changedTo = '[complex value]';
        }
        return `Property '${name}' was updated. From ${changedFrom} to ${changedTo}`;
      }
      if (type === 'withNested') {
        const { name, children } = obj;
        return iter(children);
      }
      return `nothing changed in ${obj.name}`;
    });
    console.log(lines);
    const result = `${lines.join('\n')}`;
    console.log(result);
    return result;
  };
  return iter(tree);
};

export default plain;
