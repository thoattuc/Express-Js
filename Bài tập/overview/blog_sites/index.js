const express = require('express');
const app = express();
const PORT = 3000;
const path = require('path');
const multer = require("multer");

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));


const blogs = [];

//---config multer---/
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/images')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});
const upload = multer({storage: storage});
app.get('/blogs/create', (req, res) => {
    res.render('create');
})
app.post('/blogs/create', upload.single('image'), (req, res) => {
    if (req.body && req.file) {
        const blog = {
            title: req.body.title,
            content: req.body.content,
            image: req.file.originalname,
        }
        blogs.push(blog);
        res.redirect('/blogs');
    }
});

app.get('/blogs', (req, res) => {
    res.render('blogs',{data: blogs});
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})