import express from 'express';
import path from 'path';
import { getList, getDetails, getStates, setIsDeleted, updateApplicant } from './read.module.js';

const router = express.Router();

router.get('/basic-info/read', async (req, res) => {
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

router.get('/basic-info/:id/edit', async (req, res) => {
    const id = Number(req.params.id);

    const pageData = await getDetails(id);
    const applicant = pageData[0];

    const stateOptions = await getStates();
    res.render(path.join(import.meta.dirname, 'details.ejs'), {
        applicant,
        stateOptions,
    });
});

router.post('/basic-info/save', async (req, res) => {
    const id = req.body.id || '';
    if (id) {
        // update
        const [result] = await updateApplicant(req.body)
        // res.redirect('/basic-info/read') //? this is best practice?
        res.render('./details.ejs', applicant = result)
    } else {
        // create
        const [result] = await createApplicant()
    }
});

router.get('/basic-info/:id/edit', async (req, res) => {
    const id = Number(req.params.id);

    const pageData = await getDetails(id);
    const applicant = pageData[0];

    const stateOptions = await getStates();
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
