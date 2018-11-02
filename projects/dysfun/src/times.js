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
