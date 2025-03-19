const sortByDisplayOrder = require('./src/utils/sort-by-display-order.js');

module.exports = (config) => {
    config.addPassthroughCopy('./src/images/');

    // Returns work items, sorted by display order
    config.addCollection('work', (collection) => {
        return sortByDisplayOrder(collection.getFilteredByGlob('./src/work/*.md'));
    });

    // Returns work items, sorted by display order then filtered by featured
    config.addCollection('featuredWork', (collection) => {
        return sortByDisplayOrder(collection.getFilteredByGlob('./src/work/*.md')).filter(
            (x) => x.data.featured,
        );
    });

    config.addCollection('phone', function (collection) {
        return collection.getFilteredByGlob('./src/phone/*.md');
    });

    config.addGlobalData("baseurl", process.env.BASEURL || "");

    return {
        markdownTemplateEngine: 'njk',
        dataTemplateEngine: 'njk',
        htmlTemplateEngine: 'njk',
        dir: {
            input: 'src',
            output: 'dist',
        },
    };
};