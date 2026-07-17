import { useLoaderData, useSearchParams } from 'react-router';
import PageNavigation from '#src/modules/applicants/components/PageNavigator';
import { columns } from '../columns';
import { useEffect, useState } from 'react';
import { getFilterOptions } from '@job-applicants/api-client';
import type { loadApplicants } from '../loaders';
import type { SortingState } from '@tanstack/react-table';
import type { ActiveFilters, ActiveFilterValue, BasicInfoFilterColumn, BasicInfoFilterOptions } from '@job-applicants/shared';
import { filterableBasicInfoFields } from '@job-applicants/shared';
import { FilterBar } from '#src/modules/applicants/components/FilterBar';
import { valueToParams } from '#src/modules/applicants/lib/filterUtils';
import { DataTable } from '#src/modules/applicants/components/ui/DataTable';

const ListViewPage = () => {
    const { applicants, pagination } = useLoaderData() as Awaited<ReturnType<typeof loadApplicants>>;
    const pageCount = pagination.pageCount;

    const [sorting, setSorting] = useState<SortingState>([]);
    const [searchParams, setSearchParams] = useSearchParams();

    const [activeFilters, setActiveFilters] = useState<ActiveFilters>({});
    const [pendingColumn, setPendingColumn] = useState<BasicInfoFilterColumn | null>(null);
    const [pendingValues, setPendingValues] = useState<string[]>([]);
    const [filterOptions, setFilterOptions] = useState<BasicInfoFilterOptions | null>(null);
    const [loadingFilters, setLoadingFilters] = useState(false);
    const [isFilterBarVisible, setIsFilterBarVisible] = useState(false);

    async function openFilter(column: BasicInfoFilterColumn) {
        if (activeFilters[column]) return;
        setIsFilterBarVisible(true);
        setPendingColumn(column);
        setPendingValues([]);
        if (filterOptions || loadingFilters) return;
        setLoadingFilters(true);
        try {
            const result = await getFilterOptions();
            setFilterOptions(result);
        } finally {
            setLoadingFilters(false);
        }
    }

    function clearPending() {
        setPendingColumn(null);
        setPendingValues([]);
    }
    

    function applyFilter(column: BasicInfoFilterColumn, value: ActiveFilterValue) {
        setActiveFilters((prev) => ({ ...prev, [column]: value }));
        setPendingColumn(null);
        setPendingValues([]);
        const config = filterableBasicInfoFields.find((field) => field.key === column)!;
        const params = new URLSearchParams(searchParams);
        config.filter.paramKeys.forEach((key) => params.delete(key));
        valueToParams(column, value).forEach(([k, v]) => params.append(k, v));
        params.set('page', '1');
        setSearchParams(params);
    }

    function removeFilter(column: BasicInfoFilterColumn) {
        setActiveFilters((prev) => {
            const next = { ...prev };
            delete next[column];
            return next;
        });
        const config = filterableBasicInfoFields.find((field) => field.key === column)!;
        const params = new URLSearchParams(searchParams);
        config.filter.paramKeys.forEach((key) => params.delete(key));
        params.set('page', '1');
        setSearchParams(params);
    }

    function resetFilters() {
        setActiveFilters({});
        setPendingColumn(null);
        setPendingValues([]);
        setIsFilterBarVisible(false);
        const params = new URLSearchParams(searchParams);
        filterableBasicInfoFields.forEach((field) => {
            field.filter.paramKeys.forEach((key) => params.delete(key));
        });
        params.set('page', '1');
        setSearchParams(params);
    }

    useEffect(() => {
        const sort = sorting[0];
        const params = new URLSearchParams(searchParams);
        if (sort) {
            params.set('sortOn', sort.id);
            params.set('order', sort.desc ? 'desc' : 'asc');
        } else {
            params.delete('sortOn');
            params.delete('order');
        }
        setSearchParams(params);
    }, [sorting]);

    return (
        <div className="space-y-6">
            {isFilterBarVisible && (
                <FilterBar
                    activeFilters={activeFilters}
                    filterOptions={filterOptions}
                    loadingFilters={loadingFilters}
                    pendingColumn={pendingColumn}
                    pendingValues={pendingValues}
                    onSelectColumn={openFilter}
                    onApplyFilter={applyFilter}
                    onRemoveFilter={removeFilter}
                    onChangePendingValues={setPendingValues}
                    onClearPending={clearPending}
                    onReset={resetFilters}
                />
            )}

            <DataTable
                columns={columns}
                data={applicants}
                sorting={sorting}
                setSorting={setSorting}
                openFilter={openFilter}
            />

            <PageNavigation pageCount={pageCount} />
        </div>
    );
};

export { ListViewPage };