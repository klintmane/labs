/**
* _Traverses a given array, runs the given function with each array item and returns an array with the new items for which fn is true._
* @function
* @param {Array} arr - Array to be traversed.
* @param {function} fn (item) - Function to be applied to each array item.
* @returns {Array} New array where fn is true for each item.
* @example
* // returns [1, 2]
* filter([1, 2, 3], (a) => a<3)
*/
export const filter = (arr, fn) => {
  let result = [];
  for(const item of arr) {
   (fn(item)) ? result.push(item) : undefined;
  }
  return result;
}
