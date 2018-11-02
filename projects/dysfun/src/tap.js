/**
* _Returns a function with closure over a given value, which outputs the value and executes a given function with the value._
* @function
* @param {*} val - A parameter of an unspecified type.
* @returns {function} A function, which outputs the value and executes a given function with the value.
* @example
* // traverses array ouputting the current item and running the given function (output "Value is x")
* forEach(arr, (x) => tap(x)(() => console.log(`Value is ${x}`)))
*/
// The comma operator a=(exp1,exp2,...expn) will run all exp, and assign expn to a
export const tap = (val) => {
  return (fn) => (typeof(fn) === 'function' && fn(val), console.log(val))
}
