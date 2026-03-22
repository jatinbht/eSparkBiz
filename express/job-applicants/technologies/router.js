import { Router } from 'express';
import { getTechnologiesDetails, saveTechnologiesForApplicant } from './model.js';
import {getApplicants} from '../helper/get-applicants.model.js'
import { proficiencyLevels, technologiesList } from './service.js';

const router = Router();

export default router;

router.get('/:applicantId', (req, res) => {
    res.render('technologies/edit');
});
router.get('/:applicantId/edit', async(req, res) => {
    const technologiesDetails = await getTechnologiesDetails(req.params.applicantId);
    const applicants = await getApplicants();
    res.render('technologies/edit', { technologiesList, technologies: technologiesDetails, applicants, proficiencyLevels });
});

router.post('/save', async (req, res) => {
    console.debug('req.body: ', req.body);
    const insertId = await saveTechnologiesForApplicant(req.body)
    console.debug('insertId ', insertId)
    res.redirect(`/technologies/${req.body.applicantId}`)
});
