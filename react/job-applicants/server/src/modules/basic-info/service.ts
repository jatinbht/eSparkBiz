import { basicInfoFilterableColumns } from '@job-applicants/shared/constants.js';
import * as Applicants from './model.js';
import { BasicInfoQuery } from './dto.js';
import { pluckFirstColumn } from '../../utils/shape-shifter.js';
import { BasicInfoFilterOptions } from '@job-applicants/shared/types.js'

export async function listPaginatedApplicants( query: BasicInfoQuery /* removed {pageSize, page, sortOn, order} */ ) {
    const { page, pageSize, sortOn, order, city, designation, state, gender, relationship_status, dob_from, dob_to } = query;
    const filters = { city, designation, state, gender, relationship_status };

    const offset = (page - 1) * pageSize;

    const rows = await Applicants.findAll({ pageSize, offset, sortOn, order, filters, dob_from, dob_to });

    // console.debug('applicants ', rows)
    const total = await Applicants.getCount({filters, dob_from, dob_to});
    const totalCount = Number(total.count);

    return {
        data: rows,
        pagination: {
            page,
            offset,
            pageSize,
            total: totalCount,
            pageCount: Math.ceil(totalCount / pageSize),
        },
    };
}

export async function getFilterOptions() {
    // return {
    //     // designation: await Applicants.findDistinct('designation'),
    //     // city: await Applicants.findDistinct('city'),
    //     // state: await Applicants.findDistinct('state'),
    //     // NOTE: these can be hardcoded
    //     // gender: await findDistinct('gender'),
    //     // relationship_status: await findDistinct('relationship_status'),

    //     // designation: pluckFirstColumn(await Applicants.findDistinct('designation')),
    //     // city: pluckFirstColumn(await Applicants.findDistinct('city')),
    //     // state: pluckFirstColumn(await Applicants.findDistinct('state')),
    //     // gender: pluckFirstColumn(await Applicants.findDistinct('gender')),
    //     // relationship_status: pluckFirstColumn(await Applicants.findDistinct('relationship_status')),
    // };

    const result: BasicInfoFilterOptions = {} as BasicInfoFilterOptions;

    for (const column of basicInfoFilterableColumns) {
        if (column.type === 'distinct') {
            result[column.key] = pluckFirstColumn(
                await Applicants.findDistinct(column.key),
            );
        }

        if (column.type === 'enum') {
            result[column.key] = column.options;
        }
    }

    return result;
}
