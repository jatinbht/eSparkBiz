import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.json({ message: 'Technologies section is a stub for future applicant technology routes.' });
});

export { router as technologiesRouter };
