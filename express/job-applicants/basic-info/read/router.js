import express from 'express';
import path from 'path';
import { getPageData, getApplicantCount } from './read.module.js';

const router = express.Router();

router.get('/read', async (req, res) => {
    const limit = req.query.rowsPerPage || 10;
    const offset = (req.query.pageNumber || 0) * limit;

    try {
        const pageData = await getPageData(limit, offset);
        const applicantCount = await getApplicantCount();

        res.render(path.join(import.meta.dirname, 'read.ejs'), {
            applicantCount,
            pageData,
        });
    } catch (error) {
        console.error(error);
    }
});

export default router;
