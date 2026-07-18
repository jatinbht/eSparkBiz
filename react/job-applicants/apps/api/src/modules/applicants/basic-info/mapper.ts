// server/src/modules/basic-info/mapper.ts

import type { Insertable } from 'kysely';
import type { DBOverride } from '../../../db/db-overrides.js';
import type { CreateBasicInfo } from '@job-applicants/schemas';
import { formBasicInfoFields } from '@job-applicants/shared';

export function toApplicantInsert(
    body: CreateBasicInfo,
): Insertable<DBOverride['applicant']> {
    // type BodyDob = typeof body.dob;
    const row: Partial<Insertable<DBOverride['applicant']>> = {};

    for (const field of formBasicInfoFields) {
        (row as any)[field.dbColumn] = body[field.key];
    }

    return row as Insertable<DBOverride['applicant']>;
}

// type Insert = Insertable<DB['applicant']>;
// type InsertDob = Insert['dob'];

// type InsertDob = Insertable<DBOverride['applicant']>['dob'];
