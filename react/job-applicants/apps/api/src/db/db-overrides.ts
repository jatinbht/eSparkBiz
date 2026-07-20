import type { Applicant, DB } from './db-types.js';

// kysely-codegen types DATE columns as Date, but dateStrings: true in MySQL2
// means they arrive at runtime as "YYYY-MM-DD" strings. This override corrects that.
type StringDate<T> = T extends Date ? string : T;

type FixDates<T> = {
    [K in keyof T]: StringDate<T[K]>;
};

export type ApplicantOverride = FixDates<Applicant>;

export interface DBOverride extends Omit<DB, 'applicant'> {
    applicant: ApplicantOverride;
}