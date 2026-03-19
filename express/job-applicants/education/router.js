import { Router } from "express";
import path from "path";

const router = Router()
router.get('/', (req, res) => {
    res.render('education/list')
})
router.get('/save', (req, res) => {
    console.log(req.query)
})

export default router