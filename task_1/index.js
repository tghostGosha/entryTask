import {encoded, translations} from './data.js'

const decoded = (encoded) => {
    const decodedArray = encoded.map((item) => {
        for (const key in item) {
            let result = key.toString().endsWith('Id')
            if (typeof item[key] === 'string' && translations[item[key]] !== undefined && key.toString().endsWith('Id')) {
                item[key] = translations[item[key]];
            }
        }
        return item;
    });

    return decodedArray;
};
export const uniqueIds = (encoded) => {
    const uniqueIdsSet = new Set();

    encoded.forEach((item) => {
        for (const key in item) {
            if (typeof item[key] === 'string' && translations[item[key]]) {
                uniqueIdsSet.add(item[key]);
            }
        }
    });

    return Array.from(uniqueIdsSet);
};
// console.log(decoded(encoded))
console.log(uniqueIds(encoded));
