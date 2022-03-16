const QRCode = require('qrcode');
const {v4} = require('uuid');
const db = require("../Models/index");
const {filesystems} = require("../../config/index.config");
const File = db.File;

class QrGenerator {

    constructor(data) {
        this.data = (typeof data !== "string") ? JSON.stringify(data) : data;
    }

    async qrFile() {
        try {
            const name = `qr-${v4()}.png`;
            const path = filesystems.rootPrivate.concat(name);
            await QRCode.toFile(path, this.data);
            const file = await File.create({id: v4(), name: name, type: "private"});
            return {fileId: file.id};
        } catch (e) {
            throw e
        }
    }

    async qr() {
        try {
            return await QRCode.toBuffer(this.data);
        } catch (e) {
            throw e
        }
    }
}

module.exports = {
    QrGenerator
};