"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const multer_1 = __importDefault(require("multer"));
const PORT = 3000;
const app = (0, express_1.default)();
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
const storage = multer_1.default.diskStorage({
    destination: 'uploads/',
    filename: function (req, file, cb) {
        const filename = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, filename + '-' + file.originalname);
    }
});
const upload = (0, multer_1.default)({ storage: storage });
app.post('/uploadfile', upload.single('formFile'), (req, res) => {
    const file = req.file;
    console.log(file, 'file');
    if (!file) {
        res.json({ message: "Upload file error" });
    }
    res.json({ message: "Upload file success" });
});
app.post('/uploadmultiple', upload.array('formFileMultiple', 3), (req, res) => {
    const files = req.files;
    console.log(files, 'files');
    if (!files) {
        res.json({ message: "Upload file error" });
    }
    res.send(files);
});
app.listen(PORT, () => {
    console.log("App running with port: " + PORT);
});
//# sourceMappingURL=index.js.map