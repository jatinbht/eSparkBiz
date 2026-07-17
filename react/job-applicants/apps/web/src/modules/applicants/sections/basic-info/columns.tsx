import type {CellContext, ColumnDef, HeaderContext, RowData,} from '@tanstack/react-table';
import { ArrowUpDown, ListFilter } from 'lucide-react';
import { Button } from '@job-applicants/ui/button';
import { tableBasicInfoFields, type FilterableBasicInfoField, type Formatter, type TableBasicInfoField } from '@job-applicants/shared';
import type { BasicInfo } from '@job-applicants/schemas';

declare module '@tanstack/react-table' {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    interface TableMeta<TData extends RowData> {
        openFilter: (column: FilterableBasicInfoField['key']) => void;
    }
}




// const filterableFields = basicInfoFields.filter(
//     // (field) => field.filter !== undefined,
//     isFilterableField
// );

// const filterableColumnDefs: ColumnDef<BasicInfo>[] = filterableBasicInfoFields.map((col) => ({
//     accessorKey: col.key,
//     header: filterableHeader(col.key),
//     ...(col.key === 'dob' && {
//         cell: ({ getValue }: CellContext<BasicInfo, unknown>) => {
//             const value = getValue() as string | null;
//             if (!value) return '—';
//             return new Date(value).toLocaleDateString('en-US', {
//                 day: 'numeric',
//                 month: 'long',
//                 year: 'numeric',
//             });
//         },
//     }),
// }));

function createColumn(field: TableBasicInfoField): ColumnDef<BasicInfo> {
    return {
        accessorKey: field.key,
        header: createHeader(field),

        ...(field.formatter && {
            cell: createCellFormatter(field.formatter),
        }),
    };
}

// function createHeader(field: TableBasicInfoField) {
//     if (field.filter) {
//         return filterableHeader(field.key);
//     }

//     if (field.sortable) {
//         return sortableHeader(field.label);
//     }

//     return field.label;
// }
function createHeader(field: TableBasicInfoField,): ColumnDef<BasicInfo>['header'] {
    return ({ table, column }: HeaderContext<BasicInfo, unknown>) => (
        <Button
            variant="ghost"
            onClick={() => {
                if (field.sortable) {
                    column.toggleSorting(column.getIsSorted() === 'asc');
                }
            }}
        >
            {field.label}

            {field.sortable && <ArrowUpDown className="ml-2 h-4 w-4" />}

            {field.filter && (
                <ListFilter
                    className="ml-2 h-4 w-4"
                    onClick={(e) => {
                        e.stopPropagation();
                        table.options.meta?.openFilter(field.key);
                    }}
                />
            )}
        </Button>
    );
}

function createCellFormatter(formatter: Formatter) {
    switch (formatter) {
        case 'date':
            return ({ getValue }: CellContext<BasicInfo, unknown>) => {
                const value = getValue() as string | null;

                if (!value) return '—';

                return new Date(value).toLocaleDateString('en-US', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                });
            };

        default:
            return undefined;
    }
}

// export const columns: ColumnDef<BasicInfo>[] = [
//     // {
//     //     accessorKey: 'id',
//     //     header: 'ID',
//     // },
//     {
//         accessorKey: 'first_name',
//         header: ({ column }) => (
//             <Button
//                 variant="ghost"
//                 onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
//             >
//                 Name
//                 <ArrowUpDown className="ml-2 h-4 w-4" />
//             </Button>
//         ),
//     },
//     {
//         accessorKey: 'full_address',
//         header: 'Address',
//     },
//     {
//         accessorKey: 'email',
//         header: ({ column }) => (
//             <Button
//                 variant="ghost"
//                 onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
//             >
//                 E-mail
//                 <ArrowUpDown className="ml-2 h-4 w-4" />
//             </Button>
//         ),
//     },
//     {
//         accessorKey: 'phone',
//         header: 'Phone',
//     },
//     {
//         accessorKey: 'zip_code',
//         header: 'Zip Code',
//     },
//     ...filterableColumnDefs,
// ];

export const columns = tableBasicInfoFields.map(createColumn);
