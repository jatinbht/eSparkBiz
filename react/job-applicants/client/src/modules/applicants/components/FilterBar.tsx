import { useEffect, useRef, useState } from 'react';
import { basicInfoFilterableColumns } from '@job-applicants/shared/constants';
import type { BasicInfoFilterColumn, BasicInfoFilterOptions, ActiveFilters } from '@job-applicants/shared/types';
import { Plus, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

type FilterBarProps = {
    activeFilters: ActiveFilters;
    filterOptions: BasicInfoFilterOptions | null;
    loadingFilters: boolean;
    pendingColumn: BasicInfoFilterColumn | null;
    pendingValues: string[];
    onSelectColumn: (column: BasicInfoFilterColumn) => void;
    onApplyFilter: (column: BasicInfoFilterColumn, values: string[]) => void;
    onRemoveFilter: (column: BasicInfoFilterColumn) => void;
    onChangePendingValues: (values: string[]) => void;
    onClearPending: () => void;
    onReset: () => void;
};

export function FilterBar({
    activeFilters,
    filterOptions,
    loadingFilters,
    pendingColumn,
    pendingValues,
    onSelectColumn,
    onApplyFilter,
    onRemoveFilter,
    onChangePendingValues,
    onClearPending,
    onReset,
}: FilterBarProps) {
    const [isColumnPickerOpen, setIsColumnPickerOpen] = useState(false);
    const popoverRef = useRef<HTMLDivElement>(null);
    const pendingChipRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClick(e: MouseEvent) {
            if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) {
                setIsColumnPickerOpen(false);
            }
            if (pendingChipRef.current && !pendingChipRef.current.contains(e.target as Node)) {
                onClearPending();
            }
        }
        document.addEventListener('mousedown', handleClick);
        return () => document.removeEventListener('mousedown', handleClick);
    }, [onClearPending]);

    const appliedColumns = Object.keys(activeFilters) as BasicInfoFilterColumn[];
    const remainingColumns = basicInfoFilterableColumns.filter(
        (col) => !activeFilters[col.key] && col.key !== pendingColumn
    );

    function togglePendingValue(value: string) {
        onChangePendingValues(
            pendingValues.includes(value)
                ? pendingValues.filter((v) => v !== value)
                : [...pendingValues, value]
        );
    }

    return (
        <div className="flex flex-wrap items-center gap-2 p-2 border-b">

            {/* Applied chips */}
            {appliedColumns.map((col) => {
                const config = basicInfoFilterableColumns.find((c) => c.key === col)!;
                const values = activeFilters[col]!;
                const label = `${config.label}: ${values.join(', ')}`;

                return (
                    <div
                        key={col}
                        className="flex items-center gap-1 rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-800 max-w-48"
                    >
                        <span className="truncate">{label}</span>
                        <button
                            onClick={() => onRemoveFilter(col)}
                            className="ml-1 shrink-0 rounded-full hover:bg-blue-200 p-0.5"
                        >
                            <X className="h-3 w-3" />
                        </button>
                    </div>
                );
            })}

            {/* Pending chip */}
            {pendingColumn && (
                <div
                    ref={pendingChipRef}
                    className="relative"
                >
                    {/* trigger label */}
                    <div className="flex items-center gap-1 rounded-full border border-blue-400 bg-white px-3 py-1 text-sm text-blue-800">
                        <span className="font-medium">
                            {basicInfoFilterableColumns.find((c) => c.key === pendingColumn)?.label}
                        </span>
                        <X
                            onClick={onClearPending}
                            className="h-3 w-3 cursor-pointer opacity-50 hover:opacity-100"
                        />
                    </div>

                    {/* dropdown */}
                    <div className="absolute left-0 top-full z-50 mt-1 w-56 rounded-md border bg-white shadow-lg">
                        {loadingFilters ? (
                            <p className="px-3 py-2 text-sm text-gray-400 italic">Loading...</p>
                        ) : (
                            <>
                                <div className="max-h-48 overflow-y-auto">
                                    {(filterOptions?.[pendingColumn] ?? []).map((opt) => (
                                        <label
                                            key={opt}
                                            className="flex items-center gap-2 px-3 py-1.5 hover:bg-gray-50 cursor-pointer text-sm"
                                        >
                                            <input
                                                type="checkbox"
                                                checked={pendingValues.includes(opt)}
                                                onChange={() => togglePendingValue(opt)}
                                                className="rounded"
                                            />
                                            <span>{opt}</span>
                                        </label>
                                    ))}
                                </div>

                                <div className="flex items-center justify-end gap-2 border-t px-3 py-2">
                                    <button
                                        onClick={onClearPending}
                                        className="text-xs text-gray-400 hover:text-gray-600"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={() => {
                                            if (pendingValues.length > 0) {
                                                onApplyFilter(pendingColumn, pendingValues);
                                            }
                                        }}
                                        disabled={pendingValues.length === 0}
                                        className="text-xs text-blue-600 hover:text-blue-800 disabled:opacity-40"
                                    >
                                        Apply
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}

            {/* + Add Filter */}
            <div className="relative" ref={popoverRef}>
                <Button
                    variant="ghost"
                    className="flex items-center gap-1 text-sm text-gray-500"
                    onClick={() => setIsColumnPickerOpen((prev) => !prev)}
                >
                    <Plus className="h-4 w-4" />
                    Add Filter
                </Button>

                {isColumnPickerOpen && (
                    <div className="absolute left-0 top-full z-50 mt-1 w-48 rounded-md border bg-white shadow-lg">
                        {remainingColumns.length === 0 ? (
                            <p className="px-3 py-2 text-sm text-gray-400">No more filters</p>
                        ) : (
                            remainingColumns.map((col) => (
                                <button
                                    key={col.key}
                                    className="w-full px-3 py-2 text-left text-sm hover:bg-gray-100"
                                    onClick={() => {
                                        setIsColumnPickerOpen(false);
                                        onSelectColumn(col.key);
                                    }}
                                >
                                    {col.label}
                                </button>
                            ))
                        )}
                    </div>
                )}
            </div>

            {/* Reset */}
            <button
                onClick={onReset}
                className="ms-auto text-sm text-gray-400 hover:text-red-500 transition-colors"
            >
                Reset
            </button>

        </div>
    );
}