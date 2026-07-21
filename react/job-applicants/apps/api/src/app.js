// app.js becomes:

// 1. connect DB
// 2. initialize middleware
// 3. register routes
// 4. start server

// import 'dotenv/config';
import e, { urlencoded } from 'express';
import {
    applicantsRouter,
} from './modules/applicants/router.js';
import { authRouter } from './modules/auth/router.js';
import { usersRouter } from './modules/users/router.js';
import handleError from './middleware/error-handler.js';
import { initializeConnection } from './db/mysql2.connector.js';

const app = e();


app.use(urlencoded({ extended: true }));
// app.use(e.json()); //React frontend sends JSON request bodies via POST.

app.get('/ping', (req, res) => res.send('pong'))
app.get('/api-docs.json', (req, res) => res.json(generateOpenApiDocument()));

app.use(e.json()); // for POST

import { Routes } from '@job-applicants/api-contract';

app.use('/api' + Routes.applicants.list, applicantsRouter);
app.use('/api' + Routes.auth.login.replace('/login',''), authRouter); // mount auth router at /api/auth
app.use('/api' + Routes.users.list, usersRouter);

app.use(handleError)

try {
    await initializeConnection();

    app.listen(3000, () => {
        console.log('Server running');
    });
}
catch (error) {
    console.error(error);
    process.exit(1);
}


import { generateOpenApiDocument } from './openapi.js';
import swaggerUi from 'swagger-ui-express';

const spec = generateOpenApiDocument();
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(spec));