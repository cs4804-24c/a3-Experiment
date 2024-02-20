# Latin Square

This is a simple implementation of a Latin Square in JavaScript with Typescript
types, that supports both "classic" latin squares and balanced latin squares.

Balanced latin squares are latin squares that protect against carryover
effects, but are double the size when the number of treatments is an odd
number.

## Installation

```sh
npm install latin-square
```

## Usage

```js
import latinSquare from "@quentinroy/latin-square";

// Create a balanced latin square with 4 treatments. Latin squares with an
// even number of treatments are always balanced.
const evenLatinSquare = latinSquare(["A", "B", "C", "D"]);
// [
//   [ 'A', 'B', 'D', 'C' ],
//   [ 'B', 'C', 'A', 'D' ],
//   [ 'C', 'D', 'B', 'A' ],
//   [ 'D', 'A', 'C', 'B' ]
// ]

// Creates an unbalanced latin square with 5 treatments.
const oddLatinSquare = latinSquare(["A", "B", "C", "D", "E"]);
// [
//   [ 'A', 'B', 'E', 'C', 'D' ],
//   [ 'B', 'C', 'A', 'D', 'E' ],
//   [ 'C', 'D', 'B', 'E', 'A' ],
//   [ 'D', 'E', 'C', 'A', 'B' ],
//   [ 'E', 'A', 'D', 'B', 'C' ]
// ]

// Creates a balanced latin square with 5 treatments.
const oddBalancedLatinSquare = latinSquare(["A", "B", "C", "D", "E"], true);
// [
//   [ 'A', 'B', 'E', 'C', 'D' ],
//   [ 'B', 'C', 'A', 'D', 'E' ],
//   [ 'C', 'D', 'B', 'E', 'A' ],
//   [ 'D', 'E', 'C', 'A', 'B' ],
//   [ 'E', 'A', 'D', 'B', 'C' ],
//   [ 'D', 'C', 'E', 'B', 'A' ],
//   [ 'E', 'D', 'A', 'C', 'B' ],
//   [ 'A', 'E', 'B', 'D', 'C' ],
//   [ 'B', 'A', 'C', 'E', 'D' ],
//   [ 'C', 'B', 'D', 'A', 'E' ]
// ]

// Creates a balanced latin square of size 4.
const latinSquareBySize = latinSquare(4);
// [ [ 0, 1, 3, 2 ], [ 1, 2, 0, 3 ], [ 2, 3, 1, 0 ], [ 3, 0, 2, 1 ] ]
```

## Compile

```sh
npm run build
```

## Test

The source code must be compiled for the tests to be able to run.

```sh
npm run test
```

To get test update on code change, both compile and run the test in watch mode:

```sh
npm run build -- --watch
```

and

```sh
npm run test -- --watch
```
