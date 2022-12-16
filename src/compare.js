import _ from 'lodash';

const getTreeOfDifferance = (obj1, obj2) => {
  const keys2 = Object.keys(obj1);
  const keys1 = Object.keys(obj2);
  const sortedUniqKeys = _.sortBy(_.union(keys1, keys2));
  const treeOfDifferance = sortedUniqKeys.map((key) => {
    if (_.isObject(obj1[key]) && _.isObject(obj2[key])) {
      return {
        name: key,
        type: 'withNested',
        children: getTreeOfDifferance(obj1[key], obj2[key]),
      };
    }

    if (!Object.hasOwn(obj2, key)) {
      return {
        name: key,
        type: 'deleted',
        value: obj1[key],
      };
    }

    if (!Object.hasOwn(obj1, key)) {
      return {
        name: key,
        type: 'added',
        value: obj2[key],
      };
    }

    if (obj1[key] === obj2[key]) {
      return {
        name: key,
        type: 'unchanged',
        value: obj1[key],
      };
    }
    return {
      name: key,
      type: 'changed',
      changedFrom: obj1[key],
      changedTo: obj2[key],
    };
  });
  return treeOfDifferance;
};
export default getTreeOfDifferance;
