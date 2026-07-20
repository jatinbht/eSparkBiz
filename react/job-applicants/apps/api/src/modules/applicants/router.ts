import { Router } from 'express';
import { applicantApiRouter } from './basic-info/router.js';
import { educationRouter } from './education/router.js';
import { experienceRouter } from './experience/router.js';
import { technologiesRouter } from './technologies/router.js';

const router = Router();

// Keep existing applicant collection routes at the root of /api/applicants
router.use('/', applicantApiRouter);

// Future nested applicant sections
router.use('/education', educationRouter);
router.use('/experience', experienceRouter);
router.use('/technologies', technologiesRouter);

export { router as applicantsRouter };
