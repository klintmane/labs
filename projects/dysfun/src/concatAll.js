/**
* _Flattens a one-level deep nested array._
* @function
* @param {Array} arr - Array to be flattened.
* @returns {Array} Flattened array.
* @example
* // returns ["A", "B"]
* concatAll([["A"], ["B"]])
*/
export const concatAll = (arr) => {
  let result = [];
  for(const item of arr) {
    result.push.apply(result, item); //applies the push context of item to results
  }
  return result;
}
