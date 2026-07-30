// As your project grows, mapper.ts will likely also contain:

// toApplicantInsert()
// toApplicantUpdate()
// toBasicInfoDto()
// toApplicantSummaryDto()

// which keeps all Applicant-specific transformations together.


// NOTE: 
// | Purpose                   | Kysely type             |
// | ------------------------- | ----------------------- |
// | Database table definition | `Applicant`             |
// | `INSERT` payload          | `Insertable<Applicant>` |
// | `UPDATE` payload          | `Updateable<Applicant>` |
// | `SELECT` result           | `Selectable<Applicant>` |


import type { DBOverride } from '../../db/db-overrides.js';
import type { BasicInfo, CreateBasicInfo } from '@job-applicants/schemas';
import { formBasicInfoFields } from '@job-applicants/shared';
import type { Insertable, Selectable } from "kysely";
import type { Applicant } from "../../db/db-types";

// console.log(
//     formBasicInfoFields.map(f => ({
//         key: f.key,
//         visibility: f.visibility,
//     })),
// );

type ApplicantInsert = Insertable<Applicant>;
type ApplicantRow = Selectable<Applicant>;

export function toApplicantInsert(
    body: CreateBasicInfo,
): ApplicantInsert {
    const row = {} as ApplicantInsert;

    for (const field of formBasicInfoFields) {
        (row as Record<string, unknown>)[field.dbColumn] =
            body[field.key];
    }

    return row;
}

export function toBasicInfoDto(
    applicant: ApplicantRow,
): BasicInfo {
    // console.log(
    //     applicant.createdAt,
    //     typeof applicant.createdAt,
    //     applicant.createdAt instanceof Date,
    // );

    return {
        ...applicant,
        createdAt: new Date(applicant.createdAt).toISOString(),
    };
}