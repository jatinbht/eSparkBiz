import handleAsync from '../../utils/async-handler.js';
import AppError from '../../utils/AppError.js';
import { getApplicants, getApplicantById, createApplicant } from './model.js';
import { matchedData } from "express-validator";

const listApplicants = handleAsync(async (req, res) => {
    const applicants = await getApplicants();
    if (!applicants) {
        // return res.status(404).json({ message: 'Applicant not found' });
        throw new AppError('Applicants not found', 404);
    }
    res.status(200).json(applicants);
});

const getApplicantDetails = handleAsync(async (req, res) => {
    const params = matchedData(req, { locations: ['params'] });
    const id = params.id

    const [applicant] = await getApplicantById(id);
    if (!applicant) {
        // return res.status(404).json({ message: 'Applicant not found' });
        // throw new Error('Applicant not found');
        throw new AppError('Applicant not found', 404)
    }
    res.status(200).json(applicant);
});

async function addApplicant(req, res) {
    const payload = matchedData(req, { locations: ['body'], includeOptionals: true });
    const result = await createApplicant(payload);
    res.status(201).json(result);
}

export { addApplicant, listApplicants, getApplicantDetails };
