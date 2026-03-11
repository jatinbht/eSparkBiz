import express from 'express';
const ROWS_PER_PAGE = 100; //! query this data from database (instead of hardcoding)
const TOTAL_ROWS = 1000; //! query this data from database (instead of hardcoding)

const app = express();
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    let page = Math.floor(Number(req.query.page));
    const totalPages = Math.ceil(TOTAL_ROWS / ROWS_PER_PAGE);
    let currentPage = page || 1;
    if (!page || page < 1) return res.redirect('/?page=1');
    res.render('index', { currentPage, totalPages });
});



app.listen(3000);