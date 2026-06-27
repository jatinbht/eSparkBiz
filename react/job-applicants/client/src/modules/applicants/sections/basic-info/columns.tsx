import type { CellContext, ColumnDef, RowData } from '@tanstack/react-table';
import type { BasicInfo } from '@job-applicants/schemas';
import { ArrowUpDown, ListFilter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { BasicInfoFilterColumn } from '@job-applicants/shared/types';
import { basicInfoFilterableColumns } from '@job-applicants/shared/constants';

declare module '@tanstack/react-table' {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    interface TableMeta<TData extends RowData> {
        openFilter: (column: BasicInfoFilterColumn) => void;
    }
}

function filterableHeader(key: BasicInfoFilterColumn): ColumnDef<BasicInfo>['header'] {
    const config = basicInfoFilterableColumns.find((col) => col.key === key)!;
    return ({ table }) => (
        <Button
            variant="ghost"
            onClick={() => table.options.meta?.openFilter(key)}
        >
            {config.label}
            <ListFilter className="ml-2 h-4 w-4" />
        </Button>
    );
}

const filterableColumnDefs: ColumnDef<BasicInfo>[] = basicInfoFilterableColumns.map((col) => ({
    accessorKey: col.key,
    header: filterableHeader(col.key),
    ...(col.key === 'dob' && {
        cell: ({ getValue }: CellContext<BasicInfo, unknown>) => {
            const value = getValue() as string | null;
            if (!value) return '—';
            return new Date(value).toLocaleDateString('en-US', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
            });
        },
    }),
}));

export const columns: ColumnDef<BasicInfo>[] = [
    // {
    //     accessorKey: 'id',
    //     header: 'ID',
    // },
    {
        accessorKey: 'first_name',
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            >
                Name
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
    },
    {
        accessorKey: 'full_address',
        header: 'Address',
    },
    {
        accessorKey: 'email',
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            >
                E-mail
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
    },
    {
        accessorKey: 'phone',
        header: 'Phone',
    },
    {
        accessorKey: 'zip_code',
        header: 'Zip Code',
    },
    ...filterableColumnDefs,
];