/**
* _Returns a clone of the given function that can be run only once._
* @function
* @param {function} fn - A function.
* @returns {function} A clone of the given function that can be run only once.
* @example
* // traverses array ouputting the current item and running the given function (output "Value is x")
* unary((a, b) => {}) //(arg) => fn(arg)
*/
export const once = (fn) => {
  let done = false; //if returned function is run, done will be defined
  return function () {
    return done ? undefined : ((done = true), fn.apply(this, arguments))
  }
}
