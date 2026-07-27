import * as Applicants from './model.js';
import type { BasicInfoQuery } from '@job-applicants/schemas';
import { pluckFirstColumn } from '../../utils/shape-shifter.js';
import { basicInfoFields, filterableBasicInfoFields, isFilterableField, type BasicInfoFilterOptions } from '@job-applicants/shared';
import { ErrorCode, type CreateBasicInfo } from 'packages/schemas';
import AppError from '../../errors/AppError.js';

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

    // const result: BasicInfoFilterOptions = {};   
    const result: BasicInfoFilterOptions = {
        designation: [],
        country: [],
        state: [],
        city: [],
        gender: [],
        relationshipStatus: [],
    };

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

    const filterableFields = filterableBasicInfoFields.filter(isFilterableField);

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

export async function createApplicant(payload: CreateBasicInfo) {
    const id = await Applicants.insert(payload);

    const applicant = await Applicants.findById(id);

    return applicant;
}

export async function getApplicant(id: number) {
    const applicant = await Applicants.findById(id);
    if (!applicant) {
        throw new AppError({
            status: 404,
            code: ErrorCode.NOT_FOUND,
            message: "Applicant not found",
        });
    }

    return applicant;
}
