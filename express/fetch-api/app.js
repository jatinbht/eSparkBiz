import express, { urlencoded } from 'express'
import { getCountries, getStates } from './src/model.js';

const app = express()

app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.get('/', async(req, res) => {
    const countries = await getCountries()
    console.debug('countries ', countries)
    res.render('index', {countries});
});
app.post('/fetch-states', async(req, res) => {
    console.debug('req.body ', req.body)
    console.debug('req.country ', req.country)
    const country = req.body.country
    const states = await getStates(country)
    console.debug('states from app.js ', states)
    return await states.json()
})
app.listen(3000)