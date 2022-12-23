import _ from 'lodash';

const isObject = (data) => data !== null && typeof data === 'object' && !Array.isArray(data);

const isEqual = (data1, data2) => {
  if (Array.isArray(data1) && Array.isArray(data2)) {
    if (data1.length !== data2.length) {
      return false;
    }
    const sortedData1 = data1.sort();
    const sortedData2 = data2.sort();
    for (let i = 0; i < sortedData1.length; i += 1) {
      if (sortedData1[i] !== sortedData2[i]) {
        return false;
      }
    }
    return true;
  }
  return data1 === data2;
};

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

      if (!isEqual(data1[key], data2[key])) {
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
