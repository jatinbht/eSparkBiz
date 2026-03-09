import express, { urlencoded } from "express";
const app = express();
const PORT = 3000;


// Basic route
app.get("/", (req, res) => {
    res.sendFile(import.meta.dirname + '/index.html')
});

//middleware
app.use(urlencoded({extended:true}))

app.post('/index', (req, res) => {
    console.log(req.body)
    res.send(req.body.username)
})

// Start server
app.listen(PORT)