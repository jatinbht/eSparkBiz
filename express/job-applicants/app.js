import express from 'express';
import readRouter from './basic-info/read/router.js';

export const app = express();
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/', readRouter); 
app.get('/', (req, res) => {
    res.redirect('/basic-info/read')
});

app.listen(3000);
