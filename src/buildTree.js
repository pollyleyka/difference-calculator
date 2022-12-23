import _ from 'lodash';

const isObject = (data) => _.isObject(data) && !Array.isArray(data);

const buildTree = (data1, data2) => {
  const keys2 = Object.keys(data1);
  const keys1 = Object.keys(data2);
  const keys = _.sortBy(_.union(keys1, keys2));
  return keys
    .map((key) => {
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

      if (isObject(data1[key]) && isObject(data2[key])) {
        return {
          key,
          type: 'nested',
          children: buildTree(data1[key], data2[key]),
        };
      }

      if (!_.isEqual(data1[key], data2[key])) {
        return {
          key,
          type: 'changed',
          changedFrom: data1[key],
          changedTo: data2[key],
        };
      }

      return {
        key,
        type: 'unchanged',
        value: data1[key],
      };
    });
};
export default buildTree;
