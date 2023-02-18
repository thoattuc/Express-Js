const express = require('express');
const app = express();
const PORT = 3000;
const path = require('path');

const fileUpload = require('express-fileupload');
app.use(fileUpload({
    createParentPath: true
}));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/upload', (req, res) => {
    res.render('upload');
});

app.post('/upload', (req, res) => {
    let file = req.files.file;
    console.log(file);
    file.mv(path.join(__dirname, '/public/images', file.name))
});

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
})
