import { Router } from "express";

const router = Router()

export {router}

router.get('/:applicantId', (req, res) => {
    res.render('languages/view', )
})
router.get('/:applicantId/edit', (req, res) => {
    getLanguageDetails(req.params.applicantId)
    res.render('languages/view')
})