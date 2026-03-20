import express from 'express';
import router from './basic-info/router.js'
import router2 from './education/router.js';
import router3 from './education/router.js';
import router4 from './technologies/router.js';
import path from 'path';

export const app = express();
app.set('view engine', 'ejs');
app.set('views', import.meta.dirname);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(path.join(import.meta.dirname, 'public', 'index.html'));});
app.use('/basic-info', router); 
app.use('/education', router2);
app.use('/languages', router3);
app.use('/technologies', router4);

app.listen(3000);
