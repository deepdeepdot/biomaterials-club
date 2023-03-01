1. Copy / Paste `slack_1_get_urls.js` on a Slack channel biomaterials club

```js
let imageUrls = [....]
```

2. Using node, copy/paste contents from `slack_2_download_images.js`.

Replace `imageUrls` in `executeImageDownload()`
Execute `executeImageDownload()`

3. Continuing using node, copy/paste first 95 lines in `slack_3_rename_files`

```js

let imageUrls = [
    "https://files.slack.com/files-tmb/T9NK8472R-F04R2H21UNS-c966afd7ce/img_0909_720.jpg",
    "https://files.slack.com/files-tmb/T9NK8472R-F04RYRKHV9N-a5a5660af0/img_0919_720.jpg",
    "https://files.slack.com/files-tmb/T9NK8472R-F04RPB67C5B-dce23a90e5/"
]
let filenames = getFilenames(imageUrls);
let prefixMapping = getPrefixMapping(filenames);

prefixMapping

// Edit prefixMapping according to dates
// The execute

renameFiles(imageUrls, prefixMapping);

```
