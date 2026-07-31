import * as Applicants from './model.js';
import type { BasicInfoListQuery } from '@job-applicants/schemas';
import { filterableBasicInfoFields, type BasicInfoFilterOptions } from '@job-applicants/shared';
import { ErrorCode, type CreateBasicInfo } from '@job-applicants/schemas';
import AppError from '../../errors/AppError.js';
import { toBasicInfoDto } from './mapper.js';
import { pluckFirstColumn } from '../../utils/shape-shifter.js';
import { City, Country, State } from 'country-state-city';

export async function listPaginatedApplicants( query: BasicInfoListQuery /* removed {pageSize, page, sortOn, order} */ ) {
    const { page, pageSize, sortOn, order, city, designation, state, gender, relationship_status, dob_from, dob_to } = query;
    
    const filters = { city, designation, state, gender, relationship_status };

    const offset = (page - 1) * pageSize;

    const rows = await Applicants.findAll({ pageSize, offset, sortOn, order, filters, dob_from, dob_to });

    // console.debug('applicants ', rows)
    const total = await Applicants.getCount({filters, dob_from, dob_to});
    const totalCount = Number(total.count);

    return {
        data: rows.map(toBasicInfoDto),
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

    result.country = Country.getAllCountries().map(c => c.name);

    result.state = pluckFirstColumn(
        await Applicants.findDistinct("state")
    );
    
    result.city = pluckFirstColumn(
        await Applicants.findDistinct("city")
    );

    result.designation = pluckFirstColumn(
        await Applicants.findDistinct("designation")
    );

    for (const field of filterableBasicInfoFields) {
        if (field.filter.type !== "enum") continue;
    
        switch (field.key) {
            case "gender":
                result.gender = [...field.filter.options];
                break;
    
            case "relationshipStatus":
                result.relationshipStatus = [...field.filter.options];
                break;
        }
    }

    return result;
}

export async function createApplicant(payload: CreateBasicInfo) {
    const id = await Applicants.insert(payload);

    const applicant = await Applicants.findById(id);

    if (!applicant) {
        throw new AppError({
            status: 500,
            code: 'INTERNAL_SERVER_ERROR',
            message: `Applicant ${id} not found immediately after insert.`,
        });
    }

    return toBasicInfoDto(applicant);
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

    return toBasicInfoDto(applicant);
}
