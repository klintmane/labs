/**
* _Zips two given arrays together._
* @function
* @param {Array} arrL - The first array.
* @param {Array} arrR - The second array.
* @param {function} fn(itemL, itemR) - Function for zipping items together.
* @returns {Array} New array resulting from the zip.
* @example
* // returns [8, 7]
* zip([5, 6, 8], [3, 1], (x, y) => x + y)
*/
export const zip = (arrL, arrR, fn) => {
  let i, result = [];
  for(i = 0; i < Math.min(arrL.length, arrR.length); i++) { //Math.min so we ge the length of the shortest array
    result.push(fn(arrL[i], arrR[i]));
  }
  return result;
}
