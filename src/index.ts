import express, { Express, Request, Response } from "express";
import bodyParser from 'body-parser';
import multer from 'multer';

const PORT = 3000;
const app: Express = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: function (req, file, cb) {
    const filename = Date.now() + '-' + Math.round(Math.random() * 1E9) 
    cb(null, filename + '-' + file.originalname )
  }
})
const upload = multer({ storage: storage })
app.post('/uploadfile', upload.single('formFile'), (req, res) => {
  const file = req.file;
  console.log(file, 'file')
  if (!file) {
    res.json({ message: "Upload file error" })
  }
  res.json({ message: "Upload file success" })
})

app.post('/uploadmultiple', upload.array('formFileMultiple', 3), (req, res) => {
  const files = req.files;
  console.log(files, 'files')
  if (!files) {
    res.json({ message: "Upload file error" })
  }
  res.send(files);
})


app.listen(PORT, () => {
  console.log("App running with port: " + PORT);
});