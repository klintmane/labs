/**
* _Returns a clone of the given function that stores and looks up function call outputs for faster access._
* @function
* @param {function} fn - A function.
* @returns {function} A clone of the given function that stores and looks up function call outputs.
* @example
* // Returns a memoized clone of myFunc
* myFuncFast = memoized(myFunc)
*/
export const memoized = (fn) => {
  const lookupTab = {}; // {a: fn(a), b: fn(b) ...}
  return (arg) => lookupTab[arg] || (lookupTab[arg] = fn(arg));
}
