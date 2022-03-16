const {filesystems} = require("../../../config/index.config");
const util = require("util");
const multer = require("multer");
const {v4} = require('uuid');

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, filesystems.rootPrivate);
    },
    filename: (req, file, cb) => {
        cb(null, v4().concat('-',file.originalname));
    },
});

let uploadFile = multer({
    storage: storage,
    limits: { fileSize: filesystems.maxSize },
}).single("file");

let uploadFileMiddleware = util.promisify(uploadFile);
module.exports = uploadFileMiddleware;