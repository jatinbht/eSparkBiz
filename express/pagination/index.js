import express from 'express';
import { getPageData, getApplicantCount, connection } from './src/config/learnConnector.js';

const rowsPerPage = 100; //! query this data from user/url (instead of hardcoding)
let sortMode = 'ASC' //! query this data from user/url (instead of hardcoding)
let orderBy = 'id' //! query this data from user/url (instead of hardcoding)

// console.log('applicant count: ', APPLICANT_COUNT);
// console.log('applicant count (stringify): ' + JSON.stringify(APPLICANT_COUNT));

const app = express();
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    let page = Math.floor(Number(req.query.page));
    let currentPage = page || 1;
    if (!page || page < 1) return res.redirect('/?page=1');

    // 1. Get the total count first
    getApplicantCount((err, APPLICANT_COUNT) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Database Error');
        }

        const totalPages = Math.ceil(APPLICANT_COUNT / rowsPerPage);

        // 2. Then get the specific page data
        const paginationParams = {
            page: parseInt(req.query.page) || 1,
            rowsPerPage: 10,
            sortMode: req.query.sort || 'ASC',
            orderBy: req.query.order || 'id',
            offset: (page - 1) * rowsPerPage

        };
        getPageData(paginationParams, (err, pageData) => {
            if (err) console.error(err);

            res.render('index', { currentPage, totalPages, pageData });
        });
    });
});

// app.get('/database', (req, res) => {

//     res.render('learnConnector', {pageData})
// })

app.listen(3001); //todo: handle error generated if the port is already in use
