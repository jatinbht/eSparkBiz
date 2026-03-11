import express from 'express'

const app = express()
app.set('view engine', 'ejs')
let currentPage = 1

app.get('/', (req, res) => {
    currentPage = req.params.page
    console.log('current page: ' + currentPage);

    res.render('index', {currentPage: currentPage})
})

app.listen(3000)