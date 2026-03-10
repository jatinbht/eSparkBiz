import express from 'express'

const app = express()
app.set('view engine', 'ejs')
const currentPage = 1

app.get('/', (req, res) => {
    res.render('index', {currentPage: currentPage})
})

app.get('/pages/:pageNumber', (req, res) => {
    console.log('Page Number: ' + req.params.pageNumber)
})

app.listen(3000)