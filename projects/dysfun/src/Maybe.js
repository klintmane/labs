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
