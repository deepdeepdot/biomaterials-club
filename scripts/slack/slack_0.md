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

prefixMapping =
{
  img_467: '20230320',
  img_468: '20230320',
  img_138: '20230320',
  img_139: '20230320',
  img_140: '20230320',
  img_211: '20230320',
  img_210: '20230320',
  img_209: '20230320',
  img_208: '20230320'
}

prefixMapping =
{
  img_136: '20230313', //
  img_137: '20230313', //
  img_184: '20230314', //
  img_467: '20230314', //
  img_468: '20230314', //
  img_139: '20230314', //
  img_140: '20230314', //
  img_211: '20230321', //
  img_210: '20230321', //
  img_209: '20230321', //
  img_208: '20230321', //
  img_144: '20230325', //
  img_148: '20230327', //
  img_283: '20230331', //
  pxl_202: '20230402', //
  img_152: '20230403', //
  img_153: '20230403', //
  img_154: '20230403', //
  img_307: '20230404', //
  img_305: '20230404', //
  img_304: '20230404', //
  img_072: '20230404', //
  img_315: '20230404', //
  img_156: '20230408', //
  img_115: '20230410', //
  img_120: '20230410', //
  img_336: '20230411', //
  img_335: '20230411', //
  img_334: '20230411', //
  img_333: '20230411', //
  img_221: '20230411', //

  image_f: '20230421', //
  img_227: '20230424', //
  img_224: '20230424', //
  img_223: '20230424', //
  img_673: '20230424', //
  img_675: '20230425', //
  img_055: '20230501', //
  img_978: '20230501', //

  img_218: '20230501', //
  img_532: '20230507', //
  img_537: '20230507', //
  img_530: '20230507', //
  img_545: '20230509', //
  img_544: '20230509', //
  img_521: '20230509', //
  img_587: '20230511', //
  img_578: '20230511' //
}

prefixMapping =
{
  pxl_202: '20230515',
  img_705: '20230516',
  img_706: '20230516',
  img_271: '20230520'
}

// The execute

renameFiles(imageUrls, prefixMapping);
```

5. Optimize images in /download_slack
`imagemin ./download_slack  --out-dir opt`

6. Move the renamed files from /download_slack to /public/images

7. Run `npm run thumbnails`

8. Run `npm run html` to recreate the index.html

9. Run `npm run web` to check webpage coming out as expected
