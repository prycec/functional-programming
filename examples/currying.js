const curry = require('underscore').partial;

const separate = (separator, string) => string.split(separator);

const words = curry(separate, ' ');
const phoneParts = curry(separate, "-");

console.log(words("all good men"));
console.log(phoneParts("612-790-1965"));

const UserProperties = {
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

const isType = (prefix, key) => key.indexOf(prefix) === 0;
const isBookmark = curry(isType, 'bookmark');

console.log(Object.keys(UserProperties).filter(isBookmark));
