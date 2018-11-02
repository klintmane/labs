/**
* _Traverses a given array, runs the given function with each array item and returns an array with the new items._
* @function
* @param {Array} arr - Array to be traversed.
* @param {function} fn (item) - Function to be applied to each array item.
* @returns {Array} New array where each item is fn(arr.item).
* @example
* // returns [2, 4, 6]
* map([1, 2, 3], (a) => a*2)
*/
export const map = (arr, fn) => {
  let result = [];
  for(const item of arr) {
    result.push(fn(item));
  }
  return result;
}
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
/**
* _Flattens a one-level deep nested array._
* @function
* @param {Array} arr - Array to be flattened.
* @returns {Array} Flattened array.
* @example
* // returns ["A", "B"]
* concatAll([["A"], ["B"]])
*/
export const concatAll = (arr) => {
  let result = [];
  for(const item of arr) {
    result.push.apply(result, item); //applies the push context of item to results
  }
  return result;
}
/**
* _Returns a sorting function in ascending order for the object property, to be passed to Array.sort_
* @function
* @param {*} prop - Property of the object.
* @returns {function} The sorting function to be passed to Array.sort.
* @example
* // returns persons array, sorted by age in ascending order
* let persons = [{name: "Joe", age: 32}, {name: "Al", age: 21}]
* persons.sort(sortBy("age"))
*/
export const sortBy = (prop) => {
  return (a, b) => {
    let result = (a[prop] < b[prop]) ? -1 : (a[prop] > b[prop]) ? 1 : 0;
    return result;
  }
}
/**
* _Like Maybe, but seperates failure and success into Left and Right objects, where Left can hold
* information on the failure, unlike Maybe's null value._
* @example
* var nameEither = (x) => x !== undefined ? Either.Right.of(x) : Either.Left.of("Error: Name was not provided!");
*
* var greeting = nameEither("Bob").map((x) => "Hello there " + x);
* console.log(greeting); //-> returns Right {value: "Hello there Bob"}
*
* var greetingUndefined = nameEither().map((x) => "Hello there " + x);
* console.log(greetingUndefined);//-> returns Left {value: "Error: Name was not provided!"}
*/

export const Either = {
  Left: function(val) {
    this.value = val;
  },

  Right: function(val) {
    this.value = val;
  }
}

Either.Left.of = function(val) {
  return new Either.Left(val);
}

Either.Left.prototype.map = function(f) {
  return this;
}

Either.Right.of = function(val) {
  return new Either.Right(val);
}

Either.Right.prototype.map = function(fn) {
  return Either.Right.of(fn(this.value));
}

export const Container = function(val) {
  this.value = val;
}

Container.of = function(val) {
  return new Container(val);
}

Container.prototype.map = function(fn) {
  return Container.of(fn(this.value));
}
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
/**
* _Checks if a given function returns true for **every** item of a given array._
* @function
* @param {Array} arr - Array , the items of which will be evaluated.
* @param {function} fn - Function to evaluate each item.
* @returns {boolean} true/false.
* @example
* // returns true
* every([7, 6, 5], greaterThanFour)
*/
export const every = (arr, fn) => {
  let result = true;
  for(const item of arr) {
    result = result && fn(item);
  }
  return result;
}
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
/**
* _Checks if a given function returns true for **any** item of a given array._
* @function
* @param {Array} arr - Array , the items of which will be evaluated.
* @param {function} fn - Function to evaluate each item.
* @returns {boolean} true/false.
* @example
* // returns true
* any([1, 2, 5], greaterThanFour)
*/
export const any = (arr, fn) => {
  let result = false;
  for(const item of arr) {
    result = result || fn(item);
  }
  return result;
}
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

/**
* _Zips two given arrays together._
* @function
* @param {Array} arrL - The first array.
* @param {Array} arrR - The second array.
* @param {function} fn(itemL, itemR) - Function for zipping items together.
* @returns {Array} New array resulting from the zip.
* @example
* // returns [8, 7]
* zip([5, 6, 8], [3, 1], (x, y) => x + y)
*/
export const zip = (arrL, arrR, fn) => {
  let i, result = [];
  for(i = 0; i < Math.min(arrL.length, arrR.length); i++) { //Math.min so we ge the length of the shortest array
    result.push(fn(arrL[i], arrR[i]));
  }
  return result;
}
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
/**
* _Traverses a given array, runs the given function with each array item and returns an array with the new items for which fn is true._
* @function
* @param {Array} arr - Array to be traversed.
* @param {function} fn (item) - Function to be applied to each array item.
* @returns {Array} New array where fn is true for each item.
* @example
* // returns [1, 2]
* filter([1, 2, 3], (a) => a<3)
*/
export const filter = (arr, fn) => {
  let result = [];
  for(const item of arr) {
   (fn(item)) ? result.push(item) : undefined;
  }
  return result;
}
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
/**
* _Traverses a given object and runs the given function with each object property._
* @function
* @param {Object} obj - Object to be traversed.
* @param {function} fn (key, val) - Function to be applied to each object property.
* @returns {undefined} Runs __fn__ with each __key-value pair__ as arguments.
* @example
* // outputs each key-value pair to the console as "key:value"
* forEachObj({x:0, y:1}, (k,v) => console.log(k + ":" + v))
*/
export const forEachObj = (obj,fn) => {
  for(const prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      fn(prop, obj[prop]);
    }
  }
}
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
/**
* _Runs a given function a given number of times._
* @function
* @param {number} number - Number of times __fn__ should be run.
* @param {function} fn (time) - Function to be run __number__ in total.
* @returns {undefined} Runs __fn__ a __number__ of times.
* @example
* // outputs to the console 10 times
* times(10, (x) => console.log(`Printing for the ${x} time`))
*/
export const times = (number, fn) => {
  for (let i = 0; i < number; i++) {
    fn(i);
  }
}
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

/**
* _Runs a given function if the given predicate is false._
* @function
* @param {function} fn - Function to be run if __predicate__ is false.
* @param {boolean} predicate - Either boolean or returns true/false.
* @returns {undefined} Runs __fn__ if __predicate__ is false.
* @example
* // outputs "Less than 10!" to the console if given x < 10
* unless(x > 10, () => console.log("Less than 10!"))
*/
export const unless = (predicate,fn) => {
  if(!predicate) {
    fn();
  }
}
/**
* _Useful for abstracting error-handling, handles null/undefined values by short circuiting._
* @example
* // If someFunction below returns null, Maybe.map will short-circuit/return
* // {value: null} and will not run the next map in the chain
* var greeting = D.Maybe.of("Bob")
*                       .map(someFunction)
*                       .map((x) => "Hello there, " + x);
*
* // Without Maybe we would usually manually add error handling
* if (result === null) {
*     return null
* } else {
*     doSomething(result)
* }
*
*/
export const Maybe = function(val) {
  this.value = val;
}

Maybe.of = function(val) {
  return new Maybe(val);
}

Maybe.prototype.isNothing = function() {
  return (this.value === null || this.value === undefined);
}

Maybe.prototype.map = function(fn) {
  return this.isNothing() ? Maybe.of(null) : Maybe.of(fn(this.value));
}

Maybe.prototype.join = function() {
  return this.isNothing() ? Maybe.of(null) : this.value;
}

Maybe.prototype.chain = function(fn) {
  return this.map(fn).join();
}
