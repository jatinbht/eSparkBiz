import * as Applicants from './model.js';
import type { BasicInfoQuery } from './dto.js';
import { pluckFirstColumn } from '../../../utils/shape-shifter.js';
import { basicInfoFields, isFilterableField, type BasicInfoFilterOptions } from '@job-applicants/shared';

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

    const result: BasicInfoFilterOptions = {};

    // for (const column of basicInfoFilterableColumns) {
    //     if (column.type === 'distinct') {
    //         result[column.key] = pluckFirstColumn(
    //             await Applicants.findDistinct(column.key),
    //         );
    //     }

    //     if (column.type === 'enum') {
    //         result[column.key] = column.options;
    //     }
    // }

    const filterableFields = basicInfoFields.filter(isFilterableField);

    for (const field of filterableFields) {
        // if (!field.filter) continue; // no longer needs, because the type guard already guarantees it.

        switch (field.filter.type) {
            case 'distinct':
                result[field.key] = pluckFirstColumn(
                    await Applicants.findDistinct(field.dbColumn),
                );
                break;

            case 'enum':
                result[field.key] = [...field.filter.options];
                break;
        }
    }

    return result;
}
