// ts types (if needed)
export function buildApplicantsQueryParams(
    searchParams: URLSearchParams,
    updates: Record<string, string | number | null | undefined>
) {
    const params = new URLSearchParams(searchParams);

    Object.entries(updates).forEach(([key, value]) => {
        if (value == null) {
            params.delete(key);
        } else {
            params.set(key, String(value));
        }
    });

    return `?${params.toString()}`;
};