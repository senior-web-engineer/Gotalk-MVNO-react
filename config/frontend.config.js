const appRoot = require('app-root-path');

module.exports = {
    options: {
        dotfiles: 'ignore',
        etag: true,
        extensions: ['htm', 'html'],
        index: 'index.html',
        lastModified: true,
        maxAge: '1d',
        setHeaders: function (res, path, stat) {
            res.set('x-timestamp', Date.now());
            res.header('Cache-Control', 'public, max-age=1d');
        }
    },
    frontend_dir: appRoot.path.concat('/static/frontend/build'),
    admin_dir: appRoot.path.concat('/static/admin/build'),
    appUrl: process.env.FRONTEND_APP_URL ||  "http://localhost",
    frontend_port: process.env.FRONTEND_PORT || 80,
};