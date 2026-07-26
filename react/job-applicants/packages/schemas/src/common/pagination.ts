import { z } from 'zod';

export const PaginationSchema = z.object({
  page: z.number().int().min(1),
  offset: z.number().int().min(0),
  pageSize: z.number().int().min(1),
  total: z.number().int().min(0),
  pageCount: z.number().int().min(0),
});

export type Pagination = z.infer<typeof PaginationSchema>;

// Helper to create a paginated result schema for any item schema
export function createPaginatedResultSchema<T extends z.ZodTypeAny>(
  itemSchema: T,
) {
  return z.object({
    data: z.array(itemSchema),
    pagination: PaginationSchema,
  });
}

export type PaginatedResult<T> = {
  data: T[];
  pagination: Pagination;
};
