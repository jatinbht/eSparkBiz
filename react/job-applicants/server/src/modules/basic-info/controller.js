import handleAsync from '../../utils/async-handler.js';
import AppError from '../../utils/AppError.js';
import { getApplicants, getApplicantById, createApplicant } from './model.js';

const listApplicants = handleAsync(async (req, res) => {
    const applicants = await getApplicants();
    if (!applicants) {
        // return res.status(404).json({ message: 'Applicant not found' });
        throw new AppError('Applicants not found', 404);
    }
    res.status(200).json(applicants);
});

const getApplicantDetails = handleAsync(async (req, res) => {
    const id = req.params.id
    const [applicant] = await getApplicantById(id);
    if (!applicant) {
        // return res.status(404).json({ message: 'Applicant not found' });
        // throw new Error('Applicant not found');
        throw new AppError('Applicant not found', 404)
    }
    res.status(200).json(applicant);
});

async function addApplicant(req, res) {
    const result = await createApplicant(req.body);
    res.status(201).json(result);
}

export { addApplicant, listApplicants, getApplicantDetails };
