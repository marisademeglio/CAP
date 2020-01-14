// docs: https://www.11ty.io/docs/config/
const path = require('path');
const nunjucks = require('nunjucks');
const md = require("markdown-it");
const { DateTime } = require("luxon");
const fs = require('fs');
const util = require('util');
const tagExcludeList = ["post", "posts", "blog", "certification", "resources"];
let filterTags = tags => tags ? tags.filter(item => !tagExcludeList.includes(item)) : [];

module.exports = function (eleventyConfig) {

    let nunjucksEnv = new nunjucks.Environment(
        new nunjucks.FileSystemLoader("src/_includes")
    );

    eleventyConfig.addFilter('truncate', (content, chars) => {
        // it's not pretty but it does the trick for now
        // TODO replace with more thoughtful approach
        return content ? content.slice(0, chars) + "</code></pre>" : '';
    });

    eleventyConfig.addFilter("readableDate", dateObj => {
        let retval = DateTime.fromJSDate(dateObj, { zone: 'utc' }).toFormat("dd LLL yyyy", { zone: 'utc'});
        return retval;
    });
    
    eleventyConfig.addFilter("filterTags", (tags) => filterTags(tags));

    eleventyConfig.addFilter("head", (array, n) => {
        if (n < 0) {
            return array.slice(n);
        }
        return array.slice(0, n);
    });

    eleventyConfig.addFilter("nextItem", (self, array) => {
        let idx = array.findIndex(p => p.fileSlug == self.fileSlug);
        if (idx == array.length - 1) {
            return null;
        }
        else {
            idx += 1;
            return { url: array[idx].url, title: array[idx].data.title };
        }

    });

    eleventyConfig.addFilter("prevItem", (self, array) => {
        let idx = array.findIndex(p => p.fileSlug == self.fileSlug);
        if (idx == 0) {
            return null;
        }
        else {
            idx -= 1;
            return { url: array[idx].url, title: array[idx].data.title };
        }
    });

    eleventyConfig.addFilter("sortByOrder", arr => arr.sort((a, b) => b.data.order < a.data.order));

    eleventyConfig.addFilter('dump', obj => {
        return util.inspect(obj)
    });

    eleventyConfig.addFilter('relatedPosts', (collections, thisPost) => {
        if (thisPost.data.hasOwnProperty('tags')) {
            let postsWithTags = filterTags(thisPost.data.tags).map(tag => {
                let taggedPosts = collections.post.filter(post => post.data.tags.includes(tag));
                return taggedPosts;
            }).reduce((acc, curr) => acc.concat(curr), []);
            let filteredList = postsWithTags.filter(post => post.url != thisPost.url);
            return Array.from(new Set(filteredList));
        }
        else {
            return [];
        }
        
    });

    eleventyConfig.addFilter('getPostForPage', (page, posts) => posts.find(post => post.fileSlug == page.fileSlug));

    eleventyConfig.setLibrary("njk", nunjucksEnv);

    eleventyConfig.addCollection("tagList", require("./src/_11ty/getTagList"));

    let markdownIt = require("markdown-it");
    let markdownItAnchor = require("markdown-it-anchor");
    let options = {
        html: true,
        breaks: true,
        linkify: true
    };
    let opts = {
        // permalink: true,
        // permalinkClass: "direct-link",
        // permalinkSymbol: "#"
    };

    eleventyConfig.setLibrary("md", markdownIt(options)
        .use(markdownItAnchor, opts)
    );

    eleventyConfig.addPassthroughCopy("src/css");
    eleventyConfig.addPassthroughCopy("src/images");
    eleventyConfig.setDataDeepMerge(true);


    return {
        templateFormats: [
            "md",
            "njk",
            "html",
            "liquid"
        ],
        pathPrefix: "/CAP/",
        passthroughFileCopy: true,
        dir: {
            input: "src",
            output: "docs"
        }
    };
};
