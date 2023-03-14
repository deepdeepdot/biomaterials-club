1. Copy / Paste `slack_1_get_urls.js` on a Slack channel biomaterials club

```js
let imageUrls = [....]
```

Hint: Use jsonformatter to format imageUrls
https://jsonformatter.curiousconcept.com/#


2. Check /download_slack, make sure it's not there, or it's an empty folder

3. Using node, copy/paste contents from `slack_2_download_images.js`.

Replace `imageUrls` in `executeImageDownload()`
Execute `executeImageDownload()`

4. Continuing using node, copy/paste first 95 lines in `slack_3_rename_files`

```js
let imageUrls = [
  'https://files.slack.com/files-tmb/T9NK8472R-F04R2H21UNS-c966afd7ce/img_0909_720.jpg',
  'https://files.slack.com/files-tmb/T9NK8472R-F04RYRKHV9N-a5a5660af0/img_0919_720.jpg',
  'https://files.slack.com/files-tmb/T9NK8472R-F04RPB67C5B-dce23a90e5/',
];
let filenames = getFilenames(imageUrls);
let prefixMapping = getPrefixMapping(filenames);

prefixMapping;

// Edit prefixMapping according to dates

let prefixMapping = {
  img_983: '20230302',
  img_256: '20230303',
  img_255: '20230303'
}


prefixMapping =
{
  img_132: '20230307',
  img_133: '20230307',
  img_134: '20230307',
  img_148: '20230307',
  img_136: '20230314',
  img_137: '20230314',
  img_184: '20230314'
}

// The execute

renameFiles(imageUrls, prefixMapping);
```

5. Optimize images in /download_slack

imagemin ./download_slack  --out-dir opt
6. Move the renamed files from /download_slack to /public/images

7. Run `npm run thumbnails`

8. Run `npm run html` to recreate the index.html