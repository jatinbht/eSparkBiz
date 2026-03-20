import { Router } from 'express';
import { getTechnologiesDetails, getTechnologiesList } from './model.js';

const router = Router();

export default router;

router.get('/:applicantId', (req, res) => {
    res.render('technologies/view');
});
router.get('/:applicantId/edit', (req, res) => {
    const technologiesList = getTechnologiesList();
    const technologiesDetails = getTechnologiesDetails(req.params.applicantId);
    res.render('technologies/edit', { technologiesList, technologiesDetails });
});

router.get('/save', (req, res) => {
    console.log(req.body);
});
