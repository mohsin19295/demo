const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/api',  // assuming your API calls are under /api
        createProxyMiddleware({
            target: 'https://newsapi.org',
            changeOrigin: true,
            pathRewrite: {
                '^/api': '',  // remove the '/api' path, as it's not part of the API URL
            },
        })
    );
};
