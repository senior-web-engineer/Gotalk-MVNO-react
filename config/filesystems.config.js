const appRoot = require('app-root-path');

module.exports = {
    rootPrivate: appRoot.path.concat('/resources/temp/'),
    rootPublic: appRoot.path.concat('/public/'),
    maxSize: 40 * 1024 * 1024
};