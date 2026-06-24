// export function pluckFirstColumn<T extends Record<string, unknown>>(rows: T[]) {
//     return (
//         rows
//             .map((row) => Object.values(row)[0])
//             // remove null values
//             .filter((value) => value != null)
//     );
// }

export function pluckFirstColumn<T>(rows: Record<string, T | null>[]): T[] {
    return (
        rows
            .map((row) => Object.values(row)[0])
            // remove null values
            .filter((value): value is T => value != null)
    );
}
