console.log("columns.tsx loaded");
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

function createColumn(field: TableBasicInfoField): ColumnDef<BasicInfo> {
    return {
        accessorKey: field.key,
        header: createHeader(field),

        ...(field.formatter && {
            cell: createCellFormatter(field.formatter),
        }),
    };
}

function createHeader(field: TableBasicInfoField,): ColumnDef<BasicInfo>['header'] {
    return ({ table, column }: HeaderContext<BasicInfo, unknown>) => {
        console.log("rendering header", field.key);
        return(
                <div className="flex items-center gap-2">
                {field.sortable ? (
                    <Button
                        variant="ghost"
                        onClick={() =>
                            column.toggleSorting(column.getIsSorted() === "asc")
                        }
                    >
                        <span>{field.label}</span>
                        <ArrowUpDown className="h-4 w-4" />
                    </Button>
                ) : (
                    <span>{field.label}</span>
                )}

                {field.filter && (
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => table.options.meta?.openFilter(field.key)}
                    >
                        <ListFilter />
                    </Button>
                )}
                </div>
    )};
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

export const columns = tableBasicInfoFields.map(createColumn);
