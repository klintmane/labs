/**
* _Takes functions **f1, f2, ..., fn** and returns a single function accepting **arg**, which calls **f1(...(fn(arg)))**._
* @function
* @param {...function} fns - Functions to be composed.
* @param {*} [arg] Argument to be passed to the returned function.
* @returns {function} Accepting arg.
* @example
* square = (x) => x*x
* double = (x) => x*2
* doubleSquare = compose(double, square)
* doubleSquare(4) //-> returns 32
*/

export const compose = (...fns) => {
  return (val) => {
    return reduce(fns.reverse(), (acc, fn) => fn(acc), val);
  }
}

