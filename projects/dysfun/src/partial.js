/**
* _Takes a function *fn* and arguments *argsP*, some undefined, returns a function
* taking the undefined arguments, that when called runs *fn* with the arguments combined._
* @function
* @param {function} fn - Function
* @param {*} argsP - Partial supplied arguments.
* @returns {function} Function taking the remaining undefined arguments.
* @example
* add = (x, y) => x + y
* addTwo = partial(add, 2, undefined)
* addTwo(5) // returns 7
*/
export const partial = function (fn,...argsP){
  return function(...argsF) {
    let args = argsP.slice(0);
    let arg = 0;
    for (let i = 0; i < argsP.length && arg < argsF.length; i++) {
      args[i] = args[i] || argsF[arg++];
    }
    return fn.apply(null, args);
  }
}
