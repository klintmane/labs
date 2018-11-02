import * as D from "./dist/dysfun.js";

/*
==========================================================================
                       GENERAL HIGH ORDER FUNCTIONS
==========================================================================
*/

/*
---------------------------------------------------------------------------
                                D.unless
---------------------------------------------------------------------------
*/

var x = 5;

D.unless( x > 10, () => console.log("Less than 10!") );


/*
---------------------------------------------------------------------------
                                D.times
---------------------------------------------------------------------------
*/

D.times( 2, (x) => console.log(`Printing for the ${x} time`) );


/*
---------------------------------------------------------------------------
                                D.forEach
---------------------------------------------------------------------------
*/

D.forEach( [1, 2, 3], (a) => console.log(a) );


/*
---------------------------------------------------------------------------
                                D.forEachObj
---------------------------------------------------------------------------
*/

D.forEachObj( {x:0, y:1}, (k,v) => console.log(k + ":" + v) );


/*
---------------------------------------------------------------------------
                                D.every
---------------------------------------------------------------------------
*/

console.log( D.every( [1, 2, 3], (x) => x < 4 ) );


/*
---------------------------------------------------------------------------
                                D.any
---------------------------------------------------------------------------
*/

console.log( D.any( [1, 8, 8], (x) => x < 4 ) );


/*
---------------------------------------------------------------------------
                                D.sortBy
---------------------------------------------------------------------------
*/

var arrPersons = [ {name: "Bob", age: 50}, {name: "Joe", age: 32} ]

console.log( arrPersons.sort( D.sortBy("age") ) );


/*
---------------------------------------------------------------------------
                                D.tap
---------------------------------------------------------------------------
*/

var arr = [1, 2, 3]

D.forEach( arr, (x) => D.tap(x)( () => console.log(`Value is ${x}`) ) );

/*
---------------------------------------------------------------------------
                                D.unary
---------------------------------------------------------------------------
*/

var arrParsed = ["1", "2", "3"].map(parseInt);
console.log(arrParsed); //-> [1, NaN, NaN], map calls parseInt(val, index)

var arrParsed = ["1", "2", "3"].map( D.unary(parseInt) );
console.log(arrParsed); //-> [1, 2, 3], parseInt(val) called instead


/*
---------------------------------------------------------------------------
                                D.once
---------------------------------------------------------------------------
*/

var printPassword = D.once( () => { console.log("aXkqjQy12Sh1") } );

console.log( printPassword() );


/*
---------------------------------------------------------------------------
                                D.memoized
---------------------------------------------------------------------------
*/

var factorial = (n) => {
  if (n === 0) { return 1; }
  return n * factorial( n - 1 );
}

var fastFactorial = D.memoized(factorial);

console.log( fastFactorial(7) );


/*
==========================================================================
                               ARRAY UTILITIES
==========================================================================
*/

/*
---------------------------------------------------------------------------
                                D.filter (filtering)
---------------------------------------------------------------------------
*/

console.log( D.filter( [1, 2, 3], (a) => a < 3 ) );


/*
---------------------------------------------------------------------------
                                D.map (mapping)
---------------------------------------------------------------------------
*/

console.log( D.map( [1, 2, 3], (a) => a * 2 ) );


/*
---------------------------------------------------------------------------
                                D.reduce (reducing)
---------------------------------------------------------------------------
*/

var arrObj = [{kiwi: 2, pear: 5}, {kiwi: 5, pear: 0}];

console.log( D.reduce( arrObj, (acc, item) => {return {kiwi: acc.kiwi + item.kiwi}}, {kiwi: 0} ) );


/*
---------------------------------------------------------------------------
                                D.concatAll (flattening)
---------------------------------------------------------------------------
*/

var arrNested = [ ["A"], ["B"] ];

console.log( D.concatAll( arrNested ) );


/*
---------------------------------------------------------------------------
                                D.zip (zipping/joining)
---------------------------------------------------------------------------
*/

var arr1 = [1, 2, 3];
var arr2 = [4, 5, 6];

console.log( D.zip( arr1, arr2, (x, y) => x + y ) );


/*
==========================================================================
                     CURRYING AND PARTIAL APPLICATION
==========================================================================
*/

/*
---------------------------------------------------------------------------
                                D.curry (currying)
---------------------------------------------------------------------------
*/

var addThree = (x, y, z) => x + y + z;

var addThreeCurr = D.curry( addThree );

console.log( addThreeCurr(1)(2)(3) );


/*
---------------------------------------------------------------------------
                                D.partial (partial application)
---------------------------------------------------------------------------
*/

var multiply = (x, y) => x * y;

var multiplyTwo = D.partial( multiply, 2, undefined );

console.log( multiplyTwo(5) );


/*
==========================================================================
                            COMPOSITION AND PIPING
==========================================================================
*/

/*
---------------------------------------------------------------------------
                                D.compose (composition)
---------------------------------------------------------------------------
*/

var square = (x) => x * x;
var double = (x) => x * 2;

var doubleSquare = D.compose( double, square );

console.log( doubleSquare(4) ); //-> returns 32


/*
---------------------------------------------------------------------------
                                D.pipe (piping)
---------------------------------------------------------------------------
*/

var square = (x) => x * x;
var double = (x) => x * 2;

var squareDouble = D.pipe( double, square );

console.log( squareDouble(4) ); //-> returns 64


/*
==========================================================================
                                  FUNCTORS
==========================================================================
*/

/*
---------------------------------------------------------------------------
                                D.Container
---------------------------------------------------------------------------
*/

var four = D.Container.of(4);
console.log(four);

var double = (x) => x * 2;

var sixteen = D.Container.of(4)
                         .map(double)
                         .map(double);
console.log(sixteen);


/*
---------------------------------------------------------------------------
                                D.Maybe
---------------------------------------------------------------------------
*/

var string = D.Maybe.of("abcde").map((x) => x.toUpperCase());
console.log(string);

var stringNull = D.Maybe.of(null).map((x) => x.toUpperCase());
console.log(stringNull); //-> returns { value: null } without running the function toUpperCase

var greeting = D.Maybe.of("Bob")
                      .map((x) => x.toUpperCase())
                      .map((x) => "Hello there, " + x);
console.log(greeting);

var greetingNull = D.Maybe.of("Bob")
                      .map(() => null)
                      .map((x) => "Hello there, " + x);
console.log(greetingNull); //-> returns { value: null } without running the last function

var joined = D.Maybe.of(D.Maybe.of(12));
console.log(joined); //-> { value: { value: 12 } }
console.log(joined.join()); //-> { value: 12 } joining flattens two nested Maybes

var joinedMap = joined.map((maybe) => {
  return maybe.map((val) => val * 2);
});
console.log(joinedMap); //-> { value: { value: 24 } }

joinedMap = joined.join().map((val) => val * 2);
console.log(joinedMap); //-> { value: 24 } joining makes mapping easier

var maybe = D.Maybe.of(13);
var result = maybe.map((val) => val * 2)
                  .map((val) => val + 2)
                  .join();
console.log(result);

var chainedResult = maybe.map((val) => val * 2)
                         .chain((val) => val + 2);
console.log(chainedResult);

/*
---------------------------------------------------------------------------
                                D.Either
---------------------------------------------------------------------------
*/

var nameEither = (x) => x !== undefined ? D.Either.Right.of(x) : D.Either.Left.of("Error: Name was not provided!")

var greeting = nameEither("Bob").map((x) => "Hello there " + x);
console.log(greeting); //-> returns Right {value: "Hello there Bob"}

var greetingUndefined = nameEither().map((x) => "Hello there " + x);
console.log(greetingUndefined);//-> returns Left {value: "Error: Name was not provided!"}

