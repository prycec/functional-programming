'use strict';

const list = [
    { id: 1, name: "first", selected: true},
    { id: 2, name: "second", selected: false },
    { id: 3, name: "third", selected: true}
];

const selectedFilter    = (x) => x.selected;
const nameFilter        = (x) => x.name;

const names = list.filter(selectedFilter).map(nameFilter); // returns a list of names of all of the objects where selected === true;
console.log(names); // ['first', 'second']
