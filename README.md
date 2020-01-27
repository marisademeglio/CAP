# CAP
Canadian Accessible Publishing - Home for all of our work!

## Getting these files

Clone this repository locally. Then open a terminal program and go to the directory where you put the files:

`$ cd ~/MyFiles/CAP`

Install the required libraries:
`$ npm install`

## Adding content

Edit the home page: `src/index.md`

Edit the about page: `src/about.md`

Edit the list of resources: `src/resources.md`

Edit the style: `src/css/style.css`

Add a post to "Accessibility Stories": Add a new file (in markdown or other formats) to `src/stories/posts`

Give your post some tags: 

In addition to the requisite `post` tag, you can add more tags. There is no official list of preset tags - just make something up! Add tags by editing the front matter data in your file (where you have title, author, etc):

```
---
title: Sample post
author: marisademeglio
tags:
  - post
  - howto
date: 2020-01-14
---
```



## Building the site

Build with `$ npm run build`

Commit your build. Github pages will pick up what's in the `docs` folder.

## More things you can do

* Serve the files locally with `$ npm run serve`. Browse to [localhost:8080](http://localhost:8080).
* Lint your CSS with `$ gulp lint-css`
* Pretty-format the HTML output with `$ gulp pretty-html`

## Architecture and design

This is a static site built with [11ty](http://11ty.io). It includes a blog as well as standalone pages.


