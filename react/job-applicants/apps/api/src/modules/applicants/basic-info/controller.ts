import handleAsync from '../../../utils/async-handler.js';
import AppError from '../../../api/errors/AppError.js';
import * as Applicants from './model.js';
import type { BasicInfoQuery } from './dto.js';
import { json, type Request, type Response } from 'express';
import * as service from './service.js';
import { ErrorCode } from '../../../api/errors/codes.js';

export const list = handleAsync(async (req: Request, res: Response) => {
    console.debug('req.query ', req.query);
    console.debug('res.locals.query ', res.locals.query);
    // const parsed = basicInfoQuerySchema.safeParse(req.query)
    // console.debug('parsed ', parsed)
    // const {pageSize, page, sortOn, order} = res.locals.query

    const query = res.locals.query as BasicInfoQuery;
    const result = await service.listPaginatedApplicants(query);

    // if (applicants.length === 0) {
    //     // return res.status(404).json({ message: 'Applicant not found' });
    //     throw new AppError('Applicants not found', 404);
    // }

    if (result.pagination.pageCount > 0 && query.page > result.pagination.pageCount) {
        const params = new URLSearchParams(req.query as any); //todo: i think this can be marked as 'any'. because we know that req.query would be validated by Zod and if not, it would not have had even reached here (there would have been an error)

        params.set('page', String(result.pagination.pageCount));

        return res.redirect(302, `?${params.toString()}`);
    }

    res.status(200).json(result);
});

// export const distinct = handleAsync(async (req: Request, res: Response) => {
//     // console.log(req.params)
//     console.log('res.locals.column', res.locals.column);
//     console.log('res.locals.params.column', res.locals.params.column);
    
//     const column = res.locals.params.column
//     const result = await Applicants.findDistinct(column)
//     // console.log(result);
//     const values = result.map(row => Object.values(row)[0]);
//     // result.map(Object(result))
//     res.json(values);

// })

export const filterOptions = handleAsync (async(req: Request, res: Response) => {
    const result = await service.getFilterOptions()    
    res.json(result)
})



// import { matchedData } from 'express-validator';

export const show = handleAsync(async (req: Request, res: Response) => {
    // const params = matchedData(req, { locations: ['params'] });
    // const id = params.id;
    const id = res.locals.params.id
    // console.log('id', id, typeof id);


    const applicant = await Applicants.findById(id);
    if (!applicant) {
        // return res.status(404).json({ message: 'Applicant not found' });
        // throw new Error('Applicant not found');
        throw new AppError({
            status: 404,
            code: ErrorCode.NOT_FOUND,
            message: "Applicant not found",
        });
    }
    res.status(200).json(applicant);
});

export const create = handleAsync(async (req: Request, res: Response) => {
    const payload = res.locals.body;
    console.log("Validated payload:", res.locals.body);
    const id = await Applicants.insert(payload);
    const applicant = await Applicants.findById(id);
    // console.dir(applicant, { depth: null });
    // console.log(applicant);
    res.status(201).json(applicant);
});
