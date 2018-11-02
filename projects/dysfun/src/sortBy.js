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
