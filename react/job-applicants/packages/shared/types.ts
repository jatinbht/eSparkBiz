import { basicInfoFilterableColumns } from '@job-applicants/shared/constants.js';

export type BasicInfoFilterColumn = typeof basicInfoFilterableColumns[number]['key'];

export type BasicInfoFilterType = typeof basicInfoFilterableColumns[number]['type'];


export type BasicInfoFilterOptions = Record<BasicInfoFilterColumn, readonly string[]>;
export type ActiveFilters = Partial<Record<BasicInfoFilterColumn, string[]>>;
