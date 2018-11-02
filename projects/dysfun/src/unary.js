/**
* _Returns the given function or a clone accepting only one argument._
* @function
* @param {function} fn - A function.
* @returns {function} A clone of the given function, accepting only one argument.
* @example
* // traverses array ouputting the current item and running the given function (output "Value is x")
* unary((a, b) => {}) //(arg) => fn(arg)
*/
export const unary = (fn) => {
  return fn.length === 1 ? fn : (arg) => fn(arg)
}
