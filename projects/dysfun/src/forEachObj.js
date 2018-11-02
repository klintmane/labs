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
