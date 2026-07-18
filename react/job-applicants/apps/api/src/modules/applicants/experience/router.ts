import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.json({ message: 'Experience section is a stub for future applicant experience routes.' });
});

export { router as experienceRouter };
