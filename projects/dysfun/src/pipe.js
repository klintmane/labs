/**
* _Takes functions **f1, f2, ..., fn** and returns a single function accepting **arg**, which calls **fn(...(f1(arg)))**._
* @function
* @param {...function} fns - Functions to be piped.
* @param {*} [arg] Argument to be passed to the returned function.
* @returns {function} Accepting arg.
* @example
* square = (x) => x*x
* double = (x) => x*2
* squareDouble = pipe(double, square)
* squareDouble(4) //-> returns 64
*/

export const pipe = (...fns) => {
  return (val) => {
    return reduce(fns, (acc, fn) => fn(acc), val);
  }
}

