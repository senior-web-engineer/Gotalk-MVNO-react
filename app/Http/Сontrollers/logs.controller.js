const path = require('path');
const archiver = require('archiver');
const fs = require('fs');
const appRoot = require('app-root-path');
const {v4} = require("uuid");
const fsExtra = require('fs-extra')

class LogsController {

    create = (req, res) => {
        const body = req.body;
        const zipName = `${v4()}.zip`;
        const source = path.join(appRoot.path, "storage", ((body.folder === 'all') ? 'logs' : `logs/${body.folder}`));
        const out = path.join(appRoot.path, "storage/archive_logs", zipName);
        const archive = archiver('zip', {zlib: {level: 9}});
        const stream = fs.createWriteStream(out);
        archive.directory(source, false).on('error', err => {
            throw err;
        }).pipe(stream);
        stream.on('close', () => {
            return res.download(out);
        });
        archive.finalize();
    };

    clear = (req, res) => {
        fsExtra.emptyDirSync(path.join(appRoot.path, "storage/archive_logs"))
        return res.json(true);
    };
}

module.exports = {
    LogsController
};
