const express = require('express');
const multer = require('multer');
const app = express();
const path = require('path');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images/')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now())
    }
});
const upload = multer({ storage: storage });

app.get('/upload', (req, res) => {
    res.render('upload');
});

app.post('/upload', upload.single('file'), (req, res) => {
    console.log(req.file);
    res.send('File uploaded successfully!');
});

app.listen(3000, () => console.log('Upload file app listening on port 3000!'));