// @ts-check

let fs = require('fs');

function getFilenameFromUrl(url) {
    let idx = url.lastIndexOf('/');
    let filename = url.substring(idx + 1);
    return filename;
}

let getFilenames = (urls) => urls.map(getFilenameFromUrl);

let getPrefix = (file) => file.substring(0, 7);

function getPrefixes(filenames) {
    let prefixes = filenames.map(getPrefix);
    let set = new Set(prefixes);
    return set;
}

function getSuffix(file) {
    let idx = file.lastIndexOf('.');
    let suffix = file.substr(idx + 1);
    return suffix;
}

function getPrefixMapping(filenames) {
    let today = new Date().toISOString().substr(0, 10).replaceAll('-', '');

    let mapping = {};
    let prefixes = getPrefixes(filenames);
    prefixes.forEach((prefix) => (mapping[prefix] = today));

    return mapping;
}

function getDateName(file, counterMap, prefixMapping) {
    let prefix = getPrefix(file);
    let date = prefixMapping[prefix];
    let count = counterMap.get(date) + 1;
    let suffix = getSuffix(file);

    counterMap.set(date, count);

    count = count < 10 ? `0${count}` : count; // Pad 2 digits

    return `${date}_${count}.${suffix}`;
}

function getDateCounterMap(prefixMapping) {
    let counterMap = new Map();
    for (let k in prefixMapping) {
        let v = prefixMapping[k];
        counterMap.set(v, 0);
    }
    return counterMap;
}

function getDateNames(filenames, prefixMapping) {
    let counterMap = getDateCounterMap(prefixMapping);
    let mapping = {};
    filenames.forEach(
        (file) => mapping[file] = getDateName(file, counterMap, prefixMapping)
    );
    return mapping;
}

function renameFiles(urls, prefixMapping, folder = './download_slack') {
    let filenames = getFilenames(urls);
    let nameMapping = getDateNames(filenames, prefixMapping);
    // console.log(nameMapping);

    let renameFile = (file) => {
        let newFilename = nameMapping[file];
        let source = folder ? `${folder}/${file}` : file;
        let destination = folder ? `${folder}/${newFilename}` : newFilename;

        console.log(`Renaming ${source} to ${destination}`);
        fs.rename(source, destination, (err) => {
            console.log(err);
        });
    };
    filenames.forEach(renameFile);
}

/*

let filenames = getFilenames(urls);
let prefixMapping2 = getPrefixMapping(filenames);

// Manually mapping each category :)

let prefixMapping3 = {
    2023021: '20230219',
    img_907: '20230212',
    img_122: '20230213',
    img_123: '20230213',
    img_930: '20230213',
    img_929: '20230213',
    img_932: '20230213',
    img_216: '20230220',
    img_126: '20230220',
    img_127: '20230220',
};

// renameFiles(urls, prefixMapping);

*/

module.exports = {
    getFilenameFromUrl,
    getFilenames,
    getPrefix,
    getPrefixes,
    getSuffix,
    getPrefixMapping,
    getDateName,
    getDateCounterMap,
    getDateNames,
    renameFiles
};