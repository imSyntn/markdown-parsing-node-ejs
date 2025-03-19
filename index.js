const express = require("express");
const multer = require('multer')
const path = require('path')
const fs = require('fs')
const {marked} = require('marked')

const currentDir = __dirname;

const app = express();
app.set('view engine', 'ejs')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})

const upload = multer({storage})

app.get('/', (req, res)=> {
    res.render('index');
})

app.post('/submit', upload.single('uploaded_file'), (req, res)=> {

    const filePath = path.join(currentDir, req.file.path)
    const fileContent = fs.readFileSync(filePath, "utf-8")
    const HTML = marked.parse(fileContent)
    res.render('ui', {HTML})
})

app.listen(9999, ()=> console.log("Server started."))