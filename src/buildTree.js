import _ from 'lodash';

const buildTree = (data1, data2) => {
  const keys2 = Object.keys(data1);
  const keys1 = Object.keys(data2);
  const keys = _.sortBy(_.union(keys1, keys2));
  const tree = keys.map((key) => {
    if (_.isObject(data1[key]) && _.isObject(data2[key])) {
      return {
        key,
        type: 'withNested',
        children: buildTree(data1[key], data2[key]),
      };
    }

    if (!Object.hasOwn(data2, key)) {
      return {
        key,
        type: 'deleted',
        value: data1[key],
      };
    }

    if (!Object.hasOwn(data1, key)) {
      return {
        key,
        type: 'added',
        value: data2[key],
      };
    }

    if (data1[key] === data2[key]) {
      return {
        key,
        type: 'unchanged',
        value: data1[key],
      };
    }
    return {
      key,
      type: 'changed',
      changedFrom: data1[key],
      changedTo: data2[key],
    };
  });
  return tree;
};
export default buildTree;
