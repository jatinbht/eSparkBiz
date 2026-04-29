import handleAsync from '../../utils/async-handler.js';
import AppError from '../../utils/AppError.js';
import * as Applicants from './model.js';
import { matchedData } from "express-validator";

const list = handleAsync(async (req, res) => {
    const applicants = await Applicants.findAll();
    if (!applicants) {
        // return res.status(404).json({ message: 'Applicant not found' });
        throw new AppError('Applicants not found', 404);
    }
    res.status(200).json(applicants);
});

const show = handleAsync(async (req, res) => {
    const params = matchedData(req, { locations: ['params'] });
    const id = params.id

    const [applicant] = await Applicants.findById(id);
    if (!applicant) {
        // return res.status(404).json({ message: 'Applicant not found' });
        // throw new Error('Applicant not found');
        throw new AppError('Applicant not found', 404)
    }
    res.status(200).json(applicant);
});

const create = handleAsync(async(req, res) => {
    // const payload = matchedData(req, { locations: ['body'], includeOptionals: true });
    const result = await Applicants.insert(payload);
    res.status(201).json(result);
})

export { create , list, show };
