// @ts-check
// https://app.slack.com/client/T9NK8472R/C03AG47UC84

function downloadLink(url) {
  // Creating new link node.
  let link = document.createElement('a');
  link.href = url;

  let filename = url.split('/').pop();
  link.setAttribute('target', '_blank');
  link.setAttribute('download', filename);

  document.body.appendChild(link);

  link.click();
  link.remove();
}

let thumbnails = document.querySelectorAll(
  'img[data-qa="file_image_thumbnail_img"]'
);

console.log(thumbnails.length);

downloadLink(thumbnails[0].src);
downloadLink(thumbnails[1].src);
downloadLink(thumbnails[2].src);

let imageUrls = [];
thumbnails.forEach((thumbnail) => {
  let src = thumbnail.src;
  imageUrls.push(src);
});
console.log(imageUrls);

let str = JSON.stringify(imageUrls);

imageUrls = imageUrls.slice(46);

// Copy paste to Node terminal to download the images onto some folder

console.log(imageUrls.length);
console.log(imageUrls);

// Grab the value from imageUrls => node.js to download the whole array

navigator.clipboard.writeText(str).then(
  function () {
    console.log('Async: Copying to clipboard was successful!');
  },
  function (err) {
    console.error('Async: Could not copy text: ', err);
  }
);

// https://stackoverflow.com/questions/51076581/download-images-using-html-or-javascript

// CORS and permission issues with browser/slack... maybe nodejs?

function toDataURL(url) {
  return fetch(url, { mode: 'no-cors' })
    .then((response) => {
      return response.blob();
    })
    .then((blob) => {
      return URL.createObjectURL(blob);
    })
    .catch((e) => console.log(e));
}

async function download(url) {
  const a = document.createElement('a');
  a.href = await toDataURL(url);
  a.download = 'somename.jpg';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

var url =
  'https://files.slack.com/files-tmb/T9NK8472R-F04P8LD150W-724fdb5762/img_1224_720.jpg';
download(url);

// Injecting to the clipboard is a security risk

function readClipboardFromDevTools() {
  return new Promise((resolve, reject) => {
    const _asyncCopyFn = async () => {
      try {
        const value = await navigator.clipboard.readText();
        console.log(`${value} is read!`);
        resolve(value);
      } catch (e) {
        reject(e);
      }
      window.removeEventListener('focus', _asyncCopyFn);
    };

    window.addEventListener('focus', _asyncCopyFn);
    console.log(
      'Hit <Tab> to give focus back to document (or we will face a DOMException);'
    );
  });
}

// To call:
readClipboardFromDevTools().then((r) => console.log('Returned value: ', r));

function writeClipboardFromDevTools() {
  return new Promise((resolve, reject) => {
    const _asyncCopyFn = async () => {
      try {
        const value = await navigator.clipboard.writeText(str);
        console.log(`${value} is read!`);
        resolve(value);
      } catch (e) {
        reject(e);
      }
      window.removeEventListener('focus', _asyncCopyFn);
    };

    window.addEventListener('focus', _asyncCopyFn);
    console.log(
      'Hit <Tab> to give focus back to document (or we will face a DOMException);'
    );
  });
}

// To call:
writeClipboardFromDevTools().then((r) => console.log('Returned value: ', r));

let urls = [
  'https://files.slack.com/files-tmb/T9NK8472R-F04Q4UX6NM6-270049c8b4/img_1227_720.jpg',
  'https://files.slack.com/files-tmb/T9NK8472R-F04PTTFPK7T-ea90f10de3/img_1228_720.jpg',
  'https://files.slack.com/files-tmb/T9NK8472R-F04PF5862MR-f6dd9aa816/img_1231_720.jpg',
  'https://files.slack.com/files-tmb/T9NK8472R-F04PHNJSCLC-6a8be01a9a/img_1233_720.jpg',
  'https://files.slack.com/files-tmb/T9NK8472R-F04PCAGV5K7-60605aba07/img_1235_720.jpg',
  'https://files.slack.com/files-tmb/T9NK8472R-F04Q4UXAM6C-87a71f4dc0/img_1237_720.jpg',
  'https://files.slack.com/files-tmb/T9NK8472R-F04PTTFTDU1-96cdee3d12/img_1238_720.jpg',
  'https://files.slack.com/files-tmb/T9NK8472R-F04PF82FE0K-2da9724ffb/img_9307_720.jpg',
  'https://files.slack.com/files-tmb/T9NK8472R-F04PFBJCRS6-e3d6bdebbe/img_9298_720.jpg',
  'https://files.slack.com/files-tmb/T9NK8472R-F04Q52BH7AL-d6b690899e/img_9299_720.jpg',
  'https://files.slack.com/files-tmb/T9NK8472R-F04PU0W4NPK-4363004a20/img_9321_720.jpg',
  'https://files.slack.com/files-tmb/T9NK8472R-F04Q52BHQDN-b43ce68bc6/img_9301_720.jpg',
  'https://files.slack.com/files-tmb/T9NK8472R-F04PW70R2BZ-541081442c/20230219_144052_720.jpg',
  'https://files.slack.com/files-tmb/T9NK8472R-F04QD715AKW-33e8986516/20230219_144457_720.jpg',
  'https://files.slack.com/files-tmb/T9NK8472R-F04QFH36FH8-f3d9a2078e/img_2165_720.jpg',
  'https://files.slack.com/files-tmb/T9NK8472R-F04R58576QG-9fbdb900de/img_2167_720.jpg',
  'https://files.slack.com/files-tmb/T9NK8472R-F04QDKQ3MDK-dcec7654f2/img_1264_720.jpg',
  'https://files.slack.com/files-tmb/T9NK8472R-F04Q224Q57Z-040573ce88/img_1265_720.jpg',
  'https://files.slack.com/files-tmb/T9NK8472R-F04R68SE9DE-a89e71f6c6/img_1267_720.jpg',
  'https://files.slack.com/files-tmb/T9NK8472R-F04QGEEDPBM-d0428313de/img_1268_720.jpg',
  'https://files.slack.com/files-tmb/T9NK8472R-F04QDKQ4KM3-ebe2919fcf/img_1270_720.jpg',
  'https://files.slack.com/files-tmb/T9NK8472R-F04QK255HGU-20dd0ca956/img_1271_720.jpg',
  'https://files.slack.com/files-tmb/T9NK8472R-F04R68SGG2C-784624395a/img_1272_720.jpg',
  'https://files.slack.com/files-tmb/T9NK8472R-F04QDKR42MT-94cb50de14/img_1275_720.jpg',
  'https://files.slack.com/files-tmb/T9NK8472R-F04QV76K141-7a227fca24/img_1276_720.jpg',
  'https://files.slack.com/files-tmb/T9NK8472R-F04R68TEGSU-1f82d81414/img_1277_720.jpg',
  'https://files.slack.com/files-tmb/T9NK8472R-F04QGEFDZQT-b4cdaccfa5/img_1266_720.jpg',
];

// Not real URLs => redirects to an html snippet with the real source image URL

// curl https://files.slack.com/files-tmb/T9NK8472R-F04Q4UX6NM6-270049c8b4/img_1227_720.jpg
// <a href="https://genspacemembers.slack.com/?redir=%2Ffiles-tmb%2FT9NK8472R-F04Q4UX6NM6-270049c8b4%2Fimg_1227_720.jpg">Found</a>.

// https://genspacemembers.slack.com/?redir=%2Ffiles-tmb%2FT9NK8472R-F04Q4UX6NM6-270049c8b4%2Fimg_1227_720.jpg

// => Browser: https://files.slack.com/files-tmb/T9NK8472R-F04Q4UX6NM6-270049c8b4/img_1227_720.jpg

import fs from 'fs';

let fs = require('fs'); // dynamic import

const downloadFile = async (url, path) => {
  const res = await fetch(url);
  const fileStream = fs.createWriteStream(path);
  await new Promise((resolve, reject) => {
    res.body.pipe(fileStream);
    res.body.on('error', reject);
    fileStream.on('finish', resolve);
  });
};

downloadFile(imageUrls[0], './somefile.jpg');

fetch(
  'https://assets-cdn.github.com/images/modules/logos_page/Octocat.png'
).then((res) => {
  const dest = fs.createWriteStream('./octocat.png');
  res.body.pipe(dest);
});

// https://stackoverflow.com/questions/55349722/writing-the-stream-returned-by-node-fetch

let url = imageUrls[0];
fetch(url).then(
  (res) =>
    new Promise((resolve, reject) => {
      const dest = fs.createWriteStream('./some-name.jpg');
      res.body.pipe(dest);
      dest.on('close', () => resolve());
      dest.on('error', reject);
    })
);

// Use axios instead

try {
  const res = await axios(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    onDownloadProgress: (progressEvent) => {
      const percentage = Math.round(
        (progressEvent.loaded * 100) / progressEvent.total
      );
      dispatch(downloadProgress());
      if (percentage === 100) {
        dispatch(downloadEnd());
      }
    },
  });
  const { status } = res;

  if (status === 200) {
    const fileStream = await createFileStream(folderPath, id);
    res.body.pipe(fileStream);
  } else {
    dispatch(downloadAccessError());
  }
} catch (error) {
  dispatch(downloadError());
}

async function downloadWithAxios(url, path) {
  const res = await axios(url, { responseType: 'arraybuffer' });
  const { status } = res;

  if (status === 200) {
    const buffer = Buffer.from(res.data, 'binary');
    const stream = fs.createWriteStream(path);
    stream.write(buffer);
    stream.close();
  } else {
    console.log(`Bad status: ${status}`);
  }
}

downloadWithAxios(urls[0], 'someimage.jpg');

// https://stackoverflow.com/questions/55374755/node-js-axios-download-file-stream-and-writefile

let fs = require('fs');
let axios = require('axios');

async function download(url, path) {
  axios.get(url, { responseType: 'blob' }).then((response) => {
    fs.writeFile(path, response.data, (err) => {
      if (err) throw err;
      console.log('The file has been saved!');
    });
  });
}

download(urls[0], 'someimage.jpg');

// We get a webpage from slack, it did not like a direct request, maybe need some "Authorization bearer" header?

// Try out curl... and debug the required headers / cookies
// ---

// $ curl --config slack-headers.config https://files.slack.com/files-tmb/T9NK8472R-F04Q4UX6NM6-270049c8b4/img_1227_720.jpg --output img_1227_720.jpg

let curlConfig = `header = "Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7"
  header = "Accept-Encoding: gzip, deflate, br"
  header = "Accept-Language: en-US,en;q=0.9"
  header = "Connection: keep-alive"
  header = "Cookie: b=a1ca79f5f3854e27609e7019f24c1426; _gcl_au=1.1.767533132.1676319627; _cs_c=1; _rdt_uuid=1676319628278.112f0741-15f6-4ae1-a008-442af32d883c; _lc2_fpi=e00b11ac9c9b--01gs66zdrxwmj0ww10ra1xbzjb; _ga=GA1.1.871101184.1676319627; _cs_id=039aadf2-5708-a950-d2ba-2e5b07960144.1676319627.1.1676319639.1676319627.1.1710483627703; __qca=P0-483063050-1676319639797; __ar_v4=%7C4UHU5P4P3FESHLUMNBLWAU%3A20230215%3A1%7CQCM34G7NBZEHHATIFDIUBJ%3A20230215%3A1; _fbp=fb.1.1676319640582.420791674; __adroll_fpc=99dad99896f66147c4227e318594f887-1676319640938; d=xoxd-e3adt2gsMyAC%2B3WcmfVrXHGyQNXbbUC43MxsL2abb%2BBey990QxCxLlx3Ev0DmgiwAIAy9xndBxJvIDttSqbxAqw6nBOf%2BITIgF%2FPE3BKN%2F%2BBhkST%2Bcz3hwm9DHNnhbCJINtZkI24CE8v3jNQqwtt7XK0Bc9iCEXVkcZYDJ%2FwpaAZH92sQPzZsIpW; lc=1676319645; OptanonConsent=isGpcEnabled=0&datestamp=Mon+Feb+13+2023+15%3A20%3A47+GMT-0500+(Eastern+Standard+Time)&version=202211.1.0&isIABGlobal=false&hosts=&consentId=c4ddb72e-3f8a-41f9-985d-f1b40ec6c3ed&interactionCount=1&landingPath=NotLandingPage&groups=1%3A1%2C3%3A1%2C2%3A1%2C4%3A1&AwaitingReconsent=false; shown_ssb_redirect_page=1; _ga_QTJQME5M5D=GS1.1.1676319627.1.1.1676320442.60.0.0"
  header = "Host: files.slack.com"
  header = "Pragma: no-cache"
  header = "Sec-Fetch-Dest: document"
  header = "Sec-Fetch-Mode: navigate"
  header = "Sec-Fetch-Site: none"
  header = "Sec-Fetch-User: ?1"
  header = "Upgrade-Insecure-Requests: 1"
  header = "User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36"
  header = "sec-ch-ua: 'Chromium';v='110', 'Not A(Brand';v='24', 'Google Chrome';v='110'"
  header = "sec-ch-ua-mobile: ?0"
  header = "sec-ch-ua-platform: 'Windows'"`;

function getHeaders(curlConfig) {
  let lines = curlConfig.split('\n');
  let tuples = lines.map((line) => {
    let len = line.length;
    let tuple = line.substring(10, len - 1);
    let pair = tuple.split(':');
    return [pair[0].trim(), pair[1].trim()];
  });
  let values = tuples.reduce((accumulator, currentValue) => {
    let newState = {
      [currentValue[0]]: currentValue[1],
    };
    return { ...accumulator, ...newState };
  }, {});
  return values;
}

headers = getHeaders(curlConfig);

let headers = getHeaders(curlConfig);

let fs = require('fs');
let axios = require('axios');
let headers = {};

function download(url, path) {
  axios.get(url, { headers, responseType: 'blob' }).then((response) => {
    fs.writeFile(path, response.data, (err) => {
      if (err) throw err;
      console.log(`${path} saved for: ${url}!`);
    });
  });
}

download(
  'https://gist.githubusercontent.com/dabhitapan/d3b69edbd3a31b676ccd8229870b83d4/raw/b0a81aab01457b921e83119475f6dc191250b331/octocat.png',
  './octocat.png'
);

download(urls[0], 'curl-0.jpg');

function downloadSlackImages(imageUrls, folder = './download_slack') {
  imageUrls.forEach((url) => {
    try {
      let idx = url.lastIndexOf('/');
      let filename = url.substring(idx + 1);
      download(url, folder + '/' + filename);
    } catch (e) {
      console.log(e);
    }
  });
}

let threeUrls = urls.slice(3, 6);

threeUrls = urls.slice(6, 9);
downloadSlackImages(threeUrls);

fetch(
  'https://assets-cdn.github.com/images/modules/logos_page/Octocat.png'
).then((res) => {
  const dest = fs.createWriteStream('./octocat.png');
  res.body.pipe(dest);
});

// Successful downloads with Axios, but saved images are 'bad', they have different sizes, so "most" of it might be right

// https://futurestud.io/tutorials/download-files-images-with-axios-in-node-js

('use strict');

const Fs = require('fs');
const Path = require('path');
const Axios = require('axios');

async function downloadImage() {
  const url = 'https://unsplash.com/photos/AaEQmoufHLk/download?force=true';
  const path = 'code.jpg';
  const writer = Fs.createWriteStream(path);

  const response = await Axios({
    url,
    method: 'GET',
    responseType: 'stream',
  });

  response.data.pipe(writer);

  return new Promise((resolve, reject) => {
    writer.on('finish', resolve);
    writer.on('error', reject);
  });
}

downloadImage();

let fs = require('fs');
let axios = require('axios');

function download(url, path, headers) {
  let writer = fs.createWriteStream(path);
  let response = axios({
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

const url = 'https://unsplash.com/photos/AaEQmoufHLk/download?force=true';
download(url, 'code.jpg', headers);
