import { Router } from "express";
import { commitData, getApplicantById as getEducationDetails, getApplicants } from "./model.js";

const router = Router()
router.get('/:applicantId', async (req, res) => {
    const applicantId = req.params.applicantId
    const educationDetails = await getEducationDetails(applicantId)
    if (!educationDetails) res.status(404).send('ApplicantID not found.')
    res.render('education/details', {educationDetails})
})

router.get('/:applicantId/edit', async (req, res) => {
    const applicantId = req.params.applicantId
    const educationDetails = await getEducationDetails(applicantId)
    
    const applicants = await getApplicants()
    res.render('education/edit', {educationDetails, applicants})
})
router.post('/save', async (req, res) => {
    console.log('router req.body: ', req.body)
    await commitData(req.body)
    res.redirect(`/education/${req.body.applicantId}`)
})

export default router