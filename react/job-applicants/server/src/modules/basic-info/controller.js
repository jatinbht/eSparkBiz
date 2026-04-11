import { getApplicants, getApplicantById, createApplicant } from './model.js';

async function listApplicants(req, res, next) {
    console.debug('listApplicants called')
    const applicants = await getApplicants();
    res.status(200).json(applicants)
}

async function getApplicantDetails(req, res, next) {
    const applicant = await getApplicantById(req.params.id)
    res.status(200).json(applicant)
}

async function addApplicant(req, res, next){
    const result = await createApplicant(req.body)
    res.status(201).json(result)
}

export { addApplicant, listApplicants, getApplicantDetails };
