import e, { urlencoded } from 'express';
import {
    applicantApiRouter,
    // applicantRouter,
} from './modules/basic-info/router.js';

const app = e();

app.use(urlencoded({ extended: true }));
// app.use(e.json());

app.get('/ping', (req, res) => res.send('pong'))
app.use('/api/applicants', applicantApiRouter);
// app.use('/applicants', applicantRouter);

app.listen(3000);
