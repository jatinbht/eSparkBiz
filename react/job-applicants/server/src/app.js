// import 'dotenv/config';
import e, { urlencoded } from 'express';
import {
    applicantApiRouter,
    // applicantRouter,
} from './modules/basic-info/router.js';
import handleError from './middleware/error-handler.js';

const app = e();

app.use(urlencoded({ extended: true }));
// app.use(e.json()); //React frontend sends JSON request bodies via POST.

app.get('/ping', (req, res) => res.send('pong'))
app.use('/api/applicants', applicantApiRouter);
// app.use('/applicants', applicantRouter);

app.use(handleError)

app.listen(3000);
