export const isPlainObj = obj => obj && obj.constructor === Object;

export const sortKeys = (obj = {}) =>
  Object.keys(obj)
    .sort()
    .reduce((result, key) => {
      result[key] = isPlainObj(obj[key]) ? sortKeys(obj[key]) : obj[key];
      return result;
    }, {});

export const filterKeys = (obj = {}, ...keys) =>
  Object.keys(obj)
    .filter(key => keys.includes(key))
    .reduce((result, key) => {
      result[key] = obj[key];
      return result;
    }, {});
