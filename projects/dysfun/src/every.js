/**
* _Checks if a given function returns true for **every** item of a given array._
* @function
* @param {Array} arr - Array , the items of which will be evaluated.
* @param {function} fn - Function to evaluate each item.
* @returns {boolean} true/false.
* @example
* // returns true
* every([7, 6, 5], greaterThanFour)
*/
export const every = (arr, fn) => {
  let result = true;
  for(const item of arr) {
    result = result && fn(item);
  }
  return result;
}
