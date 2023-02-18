const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const path = require('path');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

const array = [
    {
        title: "Kịch bản sốc Man City - Liverpool",
        content: "Man City và Liverpool có thể phải phân định ngôi vương bằng trận play-off."
    },
    {
        title: "Mbappe bất ngờ xuất hiện ở Madrid",
        content: "Kylian Mbappe vừa có động thái khiến truyền thông phải bất ngờ khi xuất hiện ở thủ đô Madrid của Tây Ban Nha."
    },
    {
        title: "Haaland sắp chính thức về Man City",
        content: "Tiền đạo Erling Haaland vừa chính thức hoàn tất kiểm tra y tế bắt buộc tại Bỉ để chuẩn bị ký hợp đồng gia nhập Manchester City."
    }
]
app.get('/news', (req, res) => {
    res.render('news', {data: array});
});

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
});
