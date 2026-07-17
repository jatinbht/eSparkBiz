import type { BasicInfoFilterColumn, ActiveFilterValue } from '@job-applicants/shared'

export function valueToParams(column: BasicInfoFilterColumn, value: ActiveFilterValue): [string, string][] {
    if (Array.isArray(value)) {
        return value.map((v) => [column, v]);
    }
    return [
        ...(value.from ? [['dob_from', value.from]] : []),
        ...(value.to ? [['dob_to', value.to]] : []),
    ] as [string, string][];
}