import express from 'express'
import router from './src/router.js'

const app = express()

app.set('view engine', 'ejs')
app.use('/', router)

app.listen(3000)