import sharp from 'sharp';

let imageSourceFolder = './public/test/';
let file = 'genspace.png';
let outfile = 'genspace.jpg'; // to SVG is not working :(

/* eslint-disable no-console */
sharp(`${imageSourceFolder}/${file}`).toFile(outfile, (err, info) => {
  if (err) {
    console.log(err);
  } else {
    console.log(info);
  }
});
