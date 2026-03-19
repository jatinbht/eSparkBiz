import { Router } from "express";
import path from "path";

const router = Router()
router.get('/education', (req, res) => {
    res.render(path.join(import.meta.dirname, 'list.ejs'))
})
router.get('/education/save', (req, res) => {
    console.log(req.query)
})

export default router