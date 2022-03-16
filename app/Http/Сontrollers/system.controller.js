const path = require('path');
const archiver = require('archiver');
const fs = require('fs');
const appRoot = require('app-root-path');
const {v4} = require("uuid");
const fsExtra = require('fs-extra');
const db = require("../../Models/index");
const {getPagination, getPagingData} = require("../../Utils/dbHelpers");
const PlintronStatistic = db.PlintronStatistic;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

class SystemController {


    getPlintronStatistics = async (req, res) => {
        const {limit, offset, page} = getPagination(req.query.page, req.query.per_page);
        let options = {limit, offset, order: [['id', 'DESC']]};
        if (req.query.IMSI || req.query.date) {
            options.where = {};
            if (req.query.IMSI) options.where.IMSI = req.query.IMSI;
            if (req.query.date) {
                let start = new Date(req.query.date);
                let end = new Date(req.query.date);
                start.setUTCHours(0, 0, 0, 0);
                end.setUTCHours(23, 59, 59, 999);
                options.where.createdAt = {
                    [Op.gte]: start.toUTCString(),
                    [Op.lte]: end.toUTCString()
                }
            }
        }
        return res.json({payload: getPagingData(await PlintronStatistic.findAndCountAll(options), page, limit)});
    };

    create = (req, res) => {
        const body = req.body;
        const zipName = `${v4()}.zip`;
        const source = path.join(appRoot.path, "storage", ((body.folder === 'all') ? 'logs' : `logs/${body.folder}`));
        const out = path.join(appRoot.path, "storage/archive_logs", zipName);
        const archive = archiver('zip', {zlib: {level: 9}});
        const stream = fs.createWriteStream(out);
        archive.directory(source,false).on('error', err => {
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
    SystemController: SystemController
};
