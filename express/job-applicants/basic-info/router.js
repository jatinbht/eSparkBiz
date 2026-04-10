import express from 'express';
import path from 'path';
import {
    getList,
    getDetails,
    getStates,
    setIsDeleted,
    updateApplicant,
    createApplicant,
} from './read.model.js';
import { createBasicInfoValidators } from './validator.js';
import { validateRequest } from './middleware.js';

const router = express.Router();

router.get('/', async (req, res) => {
    const limit = Number(req.query.rowsPerPage || 10);
    const offset = Number((req.query.pageNumber || 0) * limit);

    try {
        const pageData = await getList(limit, offset);
        res.render(path.join(import.meta.dirname, 'list.ejs'), {
            pageData,
        });
    } catch (error) {
        console.error(error);
    }
});

router.get('/:id/edit', async (req, res) => {
    const id = Number(req.params.id);

    const applicant = await getDetails(id);

    const stateOptions = await getStates();
    res.render(path.join(import.meta.dirname, 'edit.ejs'), {
        applicant,
        stateOptions,
    });
});

router.post('/save', createBasicInfoValidators, validateRequest, async (req, res) => {
    const id = req.body.id || '';
    console.debug(req.body)
    if (id) {
        // update
        const stateOptions = await getStates();

        const success = await updateApplicant(req.body);

        if (!success) res.status(404).send('Applicant not found.');
        res.redirect(`/basic-info/${id}`);
    } else {
        // create
        const result = await createApplicant(req.body);
        console.log(result);

        res.redirect(`/basic-info/${result.insertId}`);
    }
});

router.get('/create', async (req, res) => {
    const stateOptions = await getStates();
    const applicant = {};

    res.render(path.join(import.meta.dirname, 'edit.ejs'), {
        stateOptions,
        applicant,
    });
});
router.get('/:id', async (req, res) => {
    const id = Number(req.params.id);
    // console.log('id: ', id);

    const applicant = await getDetails(id);
    console.log('applicant: ', applicant);
    

    // const applicant = pageData[0];
    // console.log('applica: ', applicant);

    const stateOptions = await getStates();
    if (!applicant) {
        res.status(404).send('Applicant or states not found');
    }
    res.render(path.join(import.meta.dirname, 'details.ejs'), {
        applicant,
        stateOptions,
    });
});

// router.get('/basic-info/:id/delete', async (req, res) => {
//     const id = Number(req.params.id);

//     await setIsDeleted(id);
// });

export default router;
