import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.json({ message: 'Education section is a stub for future applicant education routes.' });
});

export { router as educationRouter };
