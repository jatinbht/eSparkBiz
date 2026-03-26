import express, { urlencoded } from 'express'
import { getCountries, getStates, getCities } from './src/model.js';

const app = express()

app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.get('/', async(req, res) => {
    const countries = await getCountries()
    console.debug('countries ', countries)
    res.render('index', {countries});
});
app.get(`/states`, async(req, res) => {
    console.debug('req.body ', req.query)
    console.debug('req.country ', req.query.countryId)
    const countryId = req.query.countryId

    const states = await getStates(countryId)
    console.debug('states from app.js ', states)
    const stateJson = res.json(states)
    // console.debug('stateJson ', stateJson)
    return stateJson
})

app.get('/states/:stateId/cities', async(req, res) => {
    console.debug(req.params.stateId)
    const stateId = Number(req.params.stateId)
    const cities = await getCities(stateId)
    res.json(cities)
})
app.listen(3000)