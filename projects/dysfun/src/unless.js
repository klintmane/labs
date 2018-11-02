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
