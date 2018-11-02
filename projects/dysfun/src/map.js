/**
* _Traverses a given array, runs the given function with each array item and returns an array with the new items._
* @function
* @param {Array} arr - Array to be traversed.
* @param {function} fn (item) - Function to be applied to each array item.
* @returns {Array} New array where each item is fn(arr.item).
* @example
* // returns [2, 4, 6]
* map([1, 2, 3], (a) => a*2)
*/
export const map = (arr, fn) => {
  let result = [];
  for(const item of arr) {
    result.push(fn(item));
  }
  return result;
}
