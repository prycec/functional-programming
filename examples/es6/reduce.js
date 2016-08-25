'use strict';
// es6 example

const pets = [
    { name: 'Fluffy', species: 'cat' },
    { name: 'Sam', species: 'dog', breed: 'Great Dane'},
    { name: 'Goldy', species: 'goldfish' },
    { name: 'Goldy2', species: 'goldfish' }
] ;

/**
 * Array.prototype.reduce iterates over every value in an array, using an accumulator function. In this example The
 * accumulator receives two arguments: the first is the accumulated value, the second is the current item in the
 * iteration. Array.prototype.reduce reduce takes a second, optional argument, the accumulated value at the start
 * of the iteration.
 *
 * In this example, the accumulator function puts the second argument into the list passed as the first argument
 * (the accumulated value) if the second argument is not already in the accumulated value, and then returns the
 * accumulated value to the next iteration.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce
 */
const speciesAccumulator = (list, pet) => list.indexOf(pet.species) === -1 ? list.push(pet.species) && list : list ;

console.log(pets.reduce(speciesAccumulator, []).join(", ")); //'cat', 'dog', 'goldfish'
