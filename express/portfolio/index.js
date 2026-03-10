import express from "express"

const app = express()
const PORT = 3000

app.use(express.static('public'))

app.get('/', (req, res) => {
    res.sendFile(import.meta.dirname + '/index.html')
})

app.get('/projects/html-events', (req, res) => {
    res.sendFile(import.meta.dirname + '/public/projects/html-events/index.html')
})
app.get('/projects/traffic-light', (req, res) => {
    res.sendFile(import.meta.dirname + '/public/projects/traffic-light/index.html')
})
app.get('/projects/job-applicant-form-v2', (req, res) => {
    res.sendFile(import.meta.dirname + '/public/projects/job-applicant-form-v2/basic.html')
})

app.listen(PORT)