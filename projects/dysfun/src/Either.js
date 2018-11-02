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

