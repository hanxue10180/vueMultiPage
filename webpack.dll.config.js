const path = require('path');
const webpack = require('webpack');
const base = require('./path.js');
module.exports = {
    entry: {
        vendor: ['vue-router', 'vuex', 'vue/dist/vue.common.js', 'vue/dist/vue.js', 'vue-loader/lib/component-normalizer.js', 'vue']
    },
    output: {
        path: path.resolve(base.path),
        filename: '[name].dll.js',
        library: '[name]_library'
    },
    plugins: [
        new webpack.DllPlugin({
            path: path.resolve(base.path, '[name]-manifest.json'),
            name: '[name]_library'
        })
    ]
};