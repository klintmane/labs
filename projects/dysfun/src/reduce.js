/**
* _Reduces a given array into a single value from applying a given function to the accumulator and each item._
* @function
* @param {Array} arr - Array to be reduced.
* @param {function} fn - Reducing function.
* @param {*} [init] Initial value of the accumulator.
* @returns {Array} Containing the value of the reduced array.
* @example
* // returns the sum [6]
* reduce([1, 2, 3], (acc, item) => acc + item)
* // returns the product [8]
* reduce([4, 2], (acc, item) => acc * item)
* // returns [{kiwi: 7}]
* arr = [{kiwi: 2, pear: 5}, {kiwi: 5, pear: 0}]
* reduce(arr, (acc, item) => {return {kiwi: acc.kiwi + item.kiwi}}, {kiwi: 0})
*/
export const reduce = (arr, fn, init) => {
  let acc = (init != undefined ? init : arr[0]);

  if(init === undefined) {
    for(let i = 1; i < arr.length; i++) {
      acc = fn(acc, arr[i]);
    }
  }
  else
    for(const item of arr) {
      acc = fn(acc, item);
    }
  return [acc];
}
