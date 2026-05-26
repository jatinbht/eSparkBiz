import handleAsync from '../../utils/async-handler.js';
import AppError from '../../utils/AppError.js';
import * as Applicants from './model.js';
import { basicInfoQuerySchema } from './validator.zod.js';
import type {Request, Response} from 'express'
import * as service from './service.js';

const list = handleAsync(async (req: Request, res: Response) => {
    console.debug('req.query ', req.query)
    console.debug('res.locals.query ', res.locals.query)
    // const parsed = basicInfoQuerySchema.safeParse(req.query)
    // console.debug('parsed ', parsed)
    const {limit, page, sortBy, order} = res.locals.query
    
    const result = await service.listPaginatedApplicants({limit, page, sortBy, order})

    // if (applicants.length === 0) {
    //     // return res.status(404).json({ message: 'Applicant not found' });
    //     throw new AppError('Applicants not found', 404);
    // }

    const pageCount = result.pagination.pageCount
    if (page > pageCount) {
        const params = new URLSearchParams(req.query);

        params.set('page', String(pageCount));

        return res.redirect(302, `?${params.toString()}`);
    }

    res.status(200).json(result);
});


import { matchedData } from "express-validator";

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
    const payload = matchedData(req, { locations: ['body'], includeOptionals: true });
    const result = await Applicants.insert(payload);
    res.status(201).json(result);
})

export { create , list, show };
