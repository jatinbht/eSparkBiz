import { Router } from 'express';
import {
    getTechnologiesDetails,
    saveTechnologiesForApplicant,
    updateTechnologiesForApplicant,
    upsertTechnologiesForApplicant,
} from './model.js';
import { getApplicants } from '../helper/get-applicants.model.js';
import { proficiencyLevels, technologiesList } from './service.js';

const router = Router();

export default router;

router.post('/save', async (req, res) => {
    console.debug('req.body: ', req.body);
    await upsertTechnologiesForApplicant(req.body);
    res.redirect(`/technologies/${req.body.applicant_id}`);
});

router.get('/new', async (req, res) => {
    const applicants = await getApplicants();
    const technologiesDetails = await getTechnologiesDetails(
        req.params.applicantId,
    );

    console.debug('applicants: ', applicants);

    res.render('technologies/create', {
        applicants,
        technologies: technologiesDetails,
        technologiesList,
        proficiencyLevels,
    });
});

router.get('/:applicantId', async (req, res) => {
    const applicantId = req.params.applicantId
    const technologiesDetails = await getTechnologiesDetails(
        applicantId
    );
    const applicants = await getApplicants();

    res.render('technologies/details', {
        technologiesList,
        technologies: technologiesDetails,
        applicants,
        proficiencyLevels,
        applicantId
    });
});

router.get('/:applicantId/edit', async (req, res) => {
    const applicantId = req.params.applicantId
    const technologiesDetails = await getTechnologiesDetails(
        applicantId
    );
    const applicants = await getApplicants();
    res.render('technologies/edit', {
        technologiesList,
        technologies: technologiesDetails,
        applicants,
        proficiencyLevels,
        applicantId
    });
});
