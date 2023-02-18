const express = require('express');
const app = express();
const PORT = 3000;
const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

const products = [
    {
        title: 'iphone 14',
        src: 'images/iphone.png'
    },
    {
        title: 'oppo',
        src: 'images/oppo.png'
    },
    {
        title: 'samsung',
        src: 'images/samsung.png'
    },
    {
        title: 'xiaomi',
        src: 'images/xiaomi.png'
    }
];

app.get('/products', (req, res) => {
    res.render('products', { data: products });
})

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));