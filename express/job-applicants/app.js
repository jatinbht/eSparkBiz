import express from 'express';
import readRouter from './basic-info/router.js'
import readRouter2 from './education/router.js';
import path from 'path';

export const app = express();
app.set('view engine', 'ejs');
app.set('views', import.meta.dirname);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(path.join(import.meta.dirname, 'public', 'index.html'));});
app.use('/basic-info', readRouter); 
app.use('/education', readRouter2); 

app.listen(3000);
