import * as Applicants from './model.js';

export async function listPaginatedApplicants( {limit, page, sortBy, order}){
    const offset = (page - 1) * limit

    const rows = await Applicants.findAll({limit, offset, sortBy, order});
    // console.debug('applicants ', rows)
    const total = await Applicants.getCount()
    const totalCount = total.count

    return {
        data: rows,
        pagination: {
            page,
            offset,
            limit,
            total: totalCount,
            pageCount: Math.ceil(totalCount / limit),
        },

    }
}