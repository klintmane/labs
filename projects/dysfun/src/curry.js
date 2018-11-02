/**
* _Takes a function with an arity of n and returns n nested unary functions._
* @function
* @param {function} fn - Function with n arguments.
* @returns {function} Nested functions taking one argument.
* @example
* add = curry((x, y, z) => x + y + z)
* add(5)(8)(3) //would otherwise be add(5, 8, 3)
*/
export const curry = (fn) => {
  if(typeof fn!== "function"){
    throw Error("No function provided");
  }
  return function fnCurr(...args) {
    if(args.length < fn.length) {
      return function() {
        return fnCurr.apply(null, args.concat([].slice.call(arguments)));
      }
    }
    else {
      return fn.apply(null, args);
    }
  }
}
