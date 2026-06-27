import { basicInfoFilterableColumns } from '@job-applicants/shared/constants';

export type BasicInfoFilterColumn = typeof basicInfoFilterableColumns[number]['key'];

export type BasicInfoFilterType = typeof basicInfoFilterableColumns[number]['type'];


export type BasicInfoFilterOptions = Record<BasicInfoFilterColumn, readonly string[]>;

export type DateRangeValue = { from?: string; to?: string };

export type ActiveFilterValue = string[] | DateRangeValue;

export type ActiveFilters = Partial<Record<BasicInfoFilterColumn, ActiveFilterValue>>;