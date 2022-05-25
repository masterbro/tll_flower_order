// vue.config.js

/**
 * @type {import('@vue/cli-service').ProjectOptions}
 */
module.exports = {
    // options...
    publicPath: process.env.NODE_ENV === 'production'
        ? '/assets/order/'
        : '/',
    devServer: {
        proxy: {
            '/api': {
                target: 'http://localhost:81/mdflower',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': '/'
               }
            },
        }
    }
};