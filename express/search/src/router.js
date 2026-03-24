import { Router } from "express";
import {applicantsPerPage} from './constants.js'
import { getApplicants, getCount, getSearchResult } from "./model.js";
import {validatePageNumber, getPageCount} from './service.js'

const router = Router()

router.get('/', async(req, res) => {
    const {count} = await getCount('applicant.applicants')
    const applicantsCount = count
    console.debug('applicantsCount: ', typeof applicantsCount)
    
    const pageCount = getPageCount(applicantsCount, applicantsPerPage)
    const {pageNumber, toRedirect} = validatePageNumber(req.query.pageNumber, pageCount)
    let offset = pageNumber * applicantsPerPage
    console.debug(applicantsPerPage, pageNumber, toRedirect)
    const pageData = await getApplicants(applicantsPerPage, offset)
    console.debug('pageData: ', pageData)

    if(toRedirect) return res.redirect(`/?pageNumber=1`)     
    res.render('list', {pageData, pageNumber})
})

router.get('/goto', (req, res) => {
    res.redirect(`/?pageNumber=${req.query.pageNumber}`)
})

router.get('/search', async(req, res) => {
    const q = req.query.q
    const {count} = getCount('applicant.applicants', q)
    const applicantsCount = count
    const pageCount = getPageCount(applicantsCount, applicantsPerPage)
    const {pageNumber, toRedirect} = validatePageNumber(req.query.pageNumber, pageCount)
    let offset = pageNumber * applicantsPerPage
    const pageData = await getSearchResult(q, applicantsPerPage, offset)
    res.render('list', {pageData, pageNumber, q})
})
router.get('/:id', async (req, res) => {
    //show detailed view of that applicant
    res.send('url under construction')
})


export default router