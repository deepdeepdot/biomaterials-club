[![Netlify Status](https://api.netlify.com/api/v1/badges/924f0a03-8890-4bb9-ba26-4293ae79cf95/deploy-status)](https://app.netlify.com/sites/biomaterials-club/deploys)

# Biomaterials Club

## Background

The Biomaterial Club at Genspace started around June of 2022.
It is one of the many community projects at Genspace.org.
Since then, we have been experimenting with bioplastics.
The philosophy behind bioplastics is to create biodegrabable plastics.
Most of our successful experience has been based on gelatin,
with the addition of glycerin for some elasticity and soap for bubbles.
In 2023, we will direct our focus on mycelium for a large scale
installation at the Cliffs's rock climbing gym.


## Web Production

We have been actively posting photos in our biomaterials Slack channel.
I scraped these photos from our Slack channel to create a page using a masonry layout.
Using `get_slack_images.js` to retrieve images from slack from the chrome's dev tools console.

Once we put the slack images into the `public/images`, we create the thumbnails
with `create_thumbnails.js` into `public\images\th`.

We run `npm run html` to produce `public/index.html` based on the template `templates/index.tpl`.
During the page creation, it uses `imageTraverser.js` to produce the markup for the images
and `config/version.js` to get a page versioning that it's displayed in the poem's panel.

During development, we can run `npm run pretty` to format files in `/public` and
`npm run lint` to verify linting issues with `/public/script.js` and `npm run lint:all` for all other Javascript files in `/public` and `/scripts`.

It requires an installation of [nodejs](https://nodejs.org/en/) 16 or above 
and run `npm install` after cloning this repository
https://github.com/deepdeepdot/bio-materials


```bash
$ npm install
$ npm run html       # To generate index.html
$ npm run thumbnails # To generate thumbnails from /public/images to /public/images/th
$ npm run pretty
$ npm run lint
$ npm run lint:all
$ npm run web
```

## Running locally

```bash
git clone https://github.com/deepdeepdot/biomaterials-club.git

cd biomaterials-club
npm i

npm run web

# Open a browser in http://localhost:8080
# If you get a port conflict, you can modify it in config/server.json
```


## Architecture

For the html markup, any theme-based css is applied to the `<body>` tag. All the applicable backgrounds are applied through a class on the body tag.

These are the layers:
- modal:     z-index: 20 (popup overlay)
- dashboard: z-index: 10 (for buttons and ui controls)
- banner:    z-index: 5  (non-interactive: pointer-events:none )

HTML
---
body
  page
    modal:     popup for single image view
    dashboard: right and left controls
    banner:    Biomaterials Club + Logo + poem
    main:      images and videos
      button.bananas -> show `dashboard`
      button.poem -> show poem inside `banner`
---

CSS: mobile-first


## Technology

The focus was on minimal code, bare minimal html, css, and js,
and yet very readable and maintainable.
There are myriads of web frameworks, such as React, Vue, and Svelte. However, I decided to use vanilla JS and DOM apis, and targeting the
current browsers (Sorry IE11 ;)

Currently, this is a single page and in no need of any framework.
Once we move towards into a multi page site, I am interested in using
[Astro](https://astro.build)

We are using Netlify for deployment.

Live: [https://biomaterials-club.netlify.app/](https://biomaterials-club.netlify.app/)
Live: [https://bio.educreational.com](https://bio.educreational.com)


## Performance

There's a folder `/test` where we have some older versions. The web page was quite slow when using the original images. Using thumbnails created a snappier experience, in particular for mobile.

Most are older index.html with an updated `<base href>` meta tag.

### Note
- Running Ubuntu bash on WSL 2 is extremely slow when using /mnt/
  Eslint is about 100x slower it needs to loads hundreds of npm packages
  Alternatives:
  - Either switch to WSL 1
  - Use /home/user and NOT the mount folders (vscode is happy either way)


### TODO

- Test image optimizers, in particular from the Rust ecosystem.
- Video management and optimization and interactivity
- Migrate eslint to a Rust-based linter (rome?!)
  eslint pollution: hundreds of packages downloaded and executed
- Responsive: landscape for ipads and table

