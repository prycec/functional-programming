var curry   = require('underscore').partial;
var compose = require('underscore').compose;

var UserProperties = {
    "lastPosition_position": "M12",
    "bookmark_P10_progress": "14",
    "bookmark_M12_note": "dasfasfdadsf",
    "bookmark_P10_timestamp": "1461337323000",
    "bookmark_M12_context": "Bookmark",
    "bookmark_X56_note": "81",
    "bookmark_M12_name": "dzdqwz9",
    "bookmark_P10_context": "Bookmark",
    "bookmark_P10_note": "this is a note",
    "bookmark_P10_name": "dzdqwz9",
    "bookmark_M12_timestamp": "1462469546000",
    "bookmark_X56_progress": "81",
    "lastPosition_timestamp": "1462469531000",
    "bookmark_X56_context": "Bookmark",
    "bookmark_X56_name": "dzdqwz9",
    "bookmark_M12_progress": "122",
    "bookmark_X56_timestamp": "1461171028000"
};

var ExpectedResult = [{
    loc: 'P10',
    progress: '14',
    timestamp: '1461337323000',
    context: 'Bookmark',
    note: 'this is a note',
    name: 'dzdqwz9'
}, {
    loc: 'M12',
    progress: '122',
    timestamp: '1462469546000',
    context: 'Bookmark',
    note: 'dasfasfdadsf',
    name: 'dzdqwz9'
}, {
    loc: 'X56',
    progress: '81',
    timestamp: '1461171028000',
    context: 'Bookmark',
    note: '81',
    name: 'dzdqwz9'
}];

// Strategy:
// 1: Filter out non-bookmark entries
// 2: convert the object into an array of name/value pairs, so we can work on it better.
// 3: convert name/value objects into domain objects
// 4: group the domain objects by the location property
// 5: compose the steps above to get a simple function to call.
//
// Bonus

///////////////////////////////////////////////////////////////////////////////////////
//
// 1: Create new object, with just bookmark properties
//
///////////////////////////////////////////////////////////////////////////////////////

const isType = (prefix, key) => key.indexOf(prefix) === 0;
const isBookmark = curry(isType, 'bookmark');

const filterProperties = (fn, obj) => Object.keys(obj).reduce((result, key) => {
    if (fn(key)) result[key] = obj[key];
    return result;
}, {});

const BookmarkProperties = curry(filterProperties, isBookmark);
///////////////////////////////////////////////////////////////////////////////////////
//
// 2: convert the properties to an array of objects (with a single key/value pair) so we can map on it
//
///////////////////////////////////////////////////////////////////////////////////////

var propsToArray = (obj) => Object.keys(obj).reduce((result, key) => {
        result.push({ key: key, value: obj[key] });
        return result;
    },
    []);

///////////////////////////////////////////////////////////////////////////////////////
//
// 3: Convert a object with a single key/value pair to an object with domain properties
// Example: convert "bookmark_P10_progress": "14"
//              to { loc: P10, property: 'progress', value: '14' }
//
///////////////////////////////////////////////////////////////////////////////////////

const UserPropertiesToObject = (obj) => {
    var re = /.*_(.*)_(.*)/;
    var m = obj.key.match(re);
    return {
        loc: m[1],
        property: m[2],
        value: obj.value
    };
}
const ToUserPropertiesArray = (list) => list.map(UserPropertiesToObject);

///////////////////////////////////////////////////////////////////////////////////////
//
// 4: group by loc property
//
///////////////////////////////////////////////////////////////////////////////////////

const findEntryWithPropertyValue = (keyProp, list, key) => list.find((item) => item[keyProp] === key);
const locateEntry = curry(findEntryWithPropertyValue, 'loc')

var groupBy = (list) => {
    const ListOfUniqueLoc = (list) => list.reduce((result, listElement) => {
        var entry = locateEntry(result, listElement.loc);
        if (!entry)
            result.push({
                loc: listElement.loc
            })
        return result;
    }, []);

    const AddProperties = (groupList, list) => list.reduce((result, listElement) => {
        var entry = locEntry(result, listElement.loc);
        entry[listElement.property] = listElement.value;
        return result;
    }, groupList);

    var locList = ListOfUniqueLoc(list);
    return AddProperties(locList, list);
};

///////////////////////////////////////////////////////////////////////////////////////
//
// 5: compose above function calls
//
///////////////////////////////////////////////////////////////////////////////////////
const badExample = (UserProperties) => groupBy(ToUserPropertiesArray(propsToArray(BookmarkProperties(UserProperties))));

const bookmarkListFrom = compose(groupBy, ToUserPropertiesArray, propsToArray, BookmarkProperties)

console.log(bookmarkListFrom(UserProperties))

///////////////////////////////////////////////////////////////////////////////////////
//
// Bonus -- requirements change!!!
//
///////////////////////////////////////////////////////////////////////////////////////

const GroupedListFrom = compose(groupBy, ToUserPropertiesArray, propsToArray)
const bookmarkListFrom2 = compose(GroupedListFrom, BookmarkProperties)

const isNote = curry(isType, 'note');
const NoteProperties = curry(filterProperties, isNote);
const NoteListFrom = compose(GroupedListFrom, NoteProperties);
