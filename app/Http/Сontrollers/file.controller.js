const {filesystems} = require("../../../config/index.config");
const uploadFile = require("../Middleware/upload.middleware");
const {v4} = require('uuid');
const db = require("../../Models/index");
const File = db.File;
const fs = require('fs-extra');

class FileController {

    upload = async (req, res) => {
        try {
            await uploadFile(req, res);
            if (req.file == undefined)
                return res.status(400).json({message: "Please upload a file!"});
            const fileType = (req.body.type) ? req.body.type : "private";
            const fileName = req.file.filename;

            if (fileType !== "private")
                fs.moveSync(filesystems.rootPrivate.concat(fileName), filesystems.rootPublic.concat(fileName));

            const file = await File.create({id: v4(), name: fileName, type: fileType})
            return res.status(200).json({id: file.id, fileName: fileName});
        } catch
            (err) {
            if (err.code == "LIMIT_FILE_SIZE")
                return res.status(500).json({message: "File size cannot be larger than 2MB!"});
            return res.status(500).json({message: `Could not upload the file: ${req.file}. ${err}`});
        }
    };

    download = async (req, res) => {
        if (!req.query.id)
            return res.status(404).json({message: "File id not found"});
        const file = await File.findByPk(req.query.id);
        if (!file)
            return res.status(404).json({message: "File not found"});

        const filePath = (file.type === "private") ? filesystems.rootPrivate : filesystems.rootPublic;
        return res.download(filePath.concat(file.name), file.name, (err) => {
            if (err)
                return res.status(500).json({message: "Could not download the file. " + err});
        });
    };

    remove = async (req, res) => {
        try {
            if (!req.query.id)
                return res.status(404).json({message: "File id not found"});
            const file = await File.findByPk(req.query.id);
            if (!file)
                return res.status(404).json({message: "File not found"});

            const filePath = (file.type === "private") ? filesystems.rootPrivate : filesystems.rootPublic;
            fs.removeSync(filePath.concat(file.name));
            return res.json({message: "File delete success"});
        } catch (err) {
            return res.status(500).json({message: `Could not delete file: ${err}`});
        }
    };

}

module.exports = {
    FileController
};



