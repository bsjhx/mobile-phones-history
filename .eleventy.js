const sortByDisplayOrder = require('./src/utils/sort-by-display-order.js');
require('dotenv').config();

module.exports = (config) => {
    config.addPassthroughCopy('./src/images/');

    config.addCollection('phone', function (collection) {
        console.log(collection.getFilteredByGlob('./src/phone/*.md'))
        return collection.getFilteredByGlob('./src/phone/*.md')
            .sort((a, b) => b.data.id - a.data.id);
    });

    const isProd = process.env.NODE_ENV === 'production';
    const baseurl = isProd ? './images' : '../../images';
    config.addGlobalData("baseurl", baseurl);

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