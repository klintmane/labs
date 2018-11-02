/**
* _Traverses a given array and runs the given function with each array item._
* @function
* @param {Array} arr - Array to be traversed.
* @param {function} fn (item) - Function to be applied to each array item.
* @returns {undefined} Runs __fn__ with each __array item__ as an argument.
* @example
* // outputs each array item to the console
* forEach([1, 2, 3], (a) => console.log(a))
*/
export const forEach = (arr, fn) => {
  for(const item of arr) {
    fn(item);
  }
}
