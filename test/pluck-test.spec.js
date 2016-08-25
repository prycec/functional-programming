"use strict";
// an assertion library
var expect = require('chai').expect;

// our module to test
var pluck  = require('../lib/collection-utils').pluck;

describe("Pluck", function () {
    var list = [
        {id: 1, name: "first", selected: true},
        {id: 2, name: "second", selected: false},
        {id: 3, name: "third", selected: true},
        {id: 4, selected: false}
    ];

    var object = {
        "1": {
            name    : "first",
            selected: true
        },
        "2": {
            name    : "second",
            selected: false
        },
        "3": {
            name    : "third",
            selected: true
        }
    };

    it("with array of objects : should return all the names as an array", function () {
        expect(pluck(list, "name")).to.eql(['first', 'second', 'third', undefined]);
    });

    it("with a nested object: should return all the names as an array", function () {
        expect(pluck(object, "name")).to.eql(['first', 'second', 'third']);
    })
});
