import express from 'express';

const app = express();
const PORT = 3000;
app.set('view engine', 'ejs');


app.listen(PORT);

app.get('/without-ejs', (req, res) => {
    res.sendFile(import.meta.dirname + '/index.html');
});

app.get('/projects/html-events', (req, res) => {
    res.sendFile(
        import.meta.dirname + '/public/projects/html-events/index.html',
    );
});
app.get('/projects/traffic-light', (req, res) => {
    res.sendFile(
        import.meta.dirname + '/public/projects/traffic-light/index.html',
    );
});
app.get('/projects/job-applicant-form-v2', (req, res) => {
    res.sendFile(
        import.meta.dirname +
        '/public/projects/job-applicant-form-v2/basic.html',
    );
});

app.get('/', (req, res) => {
    const html = res.render('index', { message: 'hello world' });
});


app.use(express.static('public'));
app.use((req, res, next) => {
    res.status(404).render('404');
    });