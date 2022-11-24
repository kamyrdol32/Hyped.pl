const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/',
        createProxyMiddleware({
        target: 'http://hyped-backend:5003',
        changeOrigin: true,
        })
    );
}