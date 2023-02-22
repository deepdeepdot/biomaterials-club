// @ts-check

let axios = require('axios');
let fs = require('fs');

// Get headers from the curl config file
function getHeaders(curlConfig) {
    let lineToTuple = (line) => {
        let len = line.length;
        let tuple = line.substring(10, len - 1); // Skip: "header = "
        let pair = tuple.split(':');
        return [pair[0].trim(), pair[1].trim()];
    };
    let tupleToJson = (accumulator, currentValue) => {
        if (!currentValue) return accumulator;
        let newState = {
            [currentValue[0]]: currentValue[1],
        };
        return { ...accumulator, ...newState };
    };
    let lines = curlConfig.split('\n');
    let tuples = lines.map(lineToTuple);
    let values = tuples.reduce(tupleToJson, {});
    return values;
}

async function download(url, path, headers) {
    // From: https://futurestud.io/tutorials/download-files-images-with-axios-in-node-js
    let writer = fs.createWriteStream(path);
    let response = await axios({
        url,
        method: 'GET',
        headers,
        responseType: 'stream',
    });
    response.data.pipe(writer);

    return new Promise((resolve, reject) => {
        writer.on('finish', resolve);
        writer.on('error', reject);
    });
}

let getFilenameFromUrl = (url) => {
    let idx = url.lastIndexOf('/');
    let filename = url.substring(idx + 1);
    return filename;
};

function downloadImagesFromUrls(
    imageUrls,
    folder = './download_slack',
    headers = {}
) {
    if (!fs.existsSync(folder)) {
        fs.mkdirSync(folder);
    }
    // Bunch of promises! We can do something here
    imageUrls.forEach((url) => {
        let filename = getFilenameFromUrl(url);
        download(url, folder + '/' + filename, headers)
            .then(() => console.log(`Downloaded: ${filename}`))
            .catch((e) => console.log(`FAILED ${filename}: ${e}`));
    });
}


// Read curl config
// # curl --config slack-headers.config https://files.slack.com/files-tmb/T9NK8472R-F04Q4UX6NM6-270049c8b4/img_1227_720.jpg --output img_1227_720.jpg

function downloadSlackImages(urls) {
    let curlConfig = fs.readFileSync(
        './scripts/slack/slack-headers.config',
        'utf-8'
    );
    let headers = getHeaders(curlConfig);
    downloadImagesFromUrls(urls, './download_slack', headers);
}

/*

let imageUrls = getImageUrlsFromSlack();
// imageUrls = imageUrls.slice(46); //  May need to slice and skip repetitions
downloadSlackImages(imageUrls);

*/

module.exports = {
    getHeaders,
    download,
    getFilenameFromUrl,
    downloadImagesFromUrls,
    downloadSlackImages
};
