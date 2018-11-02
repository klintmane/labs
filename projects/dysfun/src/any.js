/**
* _Checks if a given function returns true for **any** item of a given array._
* @function
* @param {Array} arr - Array , the items of which will be evaluated.
* @param {function} fn - Function to evaluate each item.
* @returns {boolean} true/false.
* @example
* // returns true
* any([1, 2, 5], greaterThanFour)
*/
export const any = (arr, fn) => {
  let result = false;
  for(const item of arr) {
    result = result || fn(item);
  }
  return result;
}
